import { TestBed } from '@angular/core/testing';

import { ABOUT } from '../../data/about.data';
import { About } from './about';

describe('About', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [About] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('is a labelled section with one paragraph per entry', async () => {
    const host = await render();
    expect(host.querySelector('section')?.getAttribute('aria-labelledby')).toBe('about-title');
    expect(host.querySelector('#about-title')).not.toBeNull();
    expect(host.querySelectorAll('.about__paragraph').length).toBe(ABOUT.paragraphs.length);
  });

  it('lists every quick fact', async () => {
    const host = await render();
    expect(host.querySelectorAll('dt').length).toBe(ABOUT.facts.length);
  });
});