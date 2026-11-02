import { TestBed } from '@angular/core/testing';

import { EXPERIENCE } from '../../data/experience.data';
import { Experience } from './experience';

describe('Experience', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [Experience] }).compileComponents();
    const fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders one timeline item per entry', async () => {
    const host = await render();
    expect(host.querySelectorAll('.timeline__item').length).toBe(EXPERIENCE.length);
  });

  it('renders every highlight and skips empty highlight lists', async () => {
    const host = await render();
    const totalHighlights = EXPERIENCE.reduce((sum, entry) => sum + entry.highlights.length, 0);
    const entriesWithHighlights = EXPERIENCE.filter((entry) => entry.highlights.length > 0).length;

    expect(host.querySelectorAll('.entry__highlights li').length).toBe(totalHighlights);
    expect(host.querySelectorAll('.entry__highlights').length).toBe(entriesWithHighlights);
  });
});