import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ScrollSpy } from '../../../core/services/scroll-spy';
import { PROFILE } from '../../../data/profile.data';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the copyright with the current year and your name', async () => {
    const host = await render();
    const text = host.querySelector('.footer__copy')?.textContent ?? '';
    expect(text).toContain(String(new Date().getFullYear()));
    expect(text).toContain(PROFILE.name);
  });

  it('scrolls back to the top', async () => {
    const goTo = vi.spyOn(TestBed.inject(ScrollSpy), 'goTo').mockImplementation(() => undefined);
    const host = await render();
    host.querySelector<HTMLAnchorElement>('.footer__top')?.click();
    expect(goTo).toHaveBeenCalledWith('home', expect.any(Event));
  });
});