import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ScrollSpy } from '../../core/services/scroll-spy';
import { PROFILE } from '../../data/profile.data';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Hero] }).compileComponents();
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the name as the page heading', async () => {
    const host = await render();
    const heading = host.querySelector('h1');
    expect(heading?.textContent?.replace(/\s+/g, ' ').trim()).toBe(PROFILE.name);
  });

  it('scrolls to the projects section from the primary button', async () => {
    const goTo = vi.spyOn(TestBed.inject(ScrollSpy), 'goTo').mockImplementation(() => undefined);
    const host = await render();
    host.querySelector<HTMLAnchorElement>('.btn--primary')?.click();
    expect(goTo).toHaveBeenCalledWith('projects', expect.any(Event));
  });
});