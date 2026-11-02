import { TestBed } from '@angular/core/testing';

import { SOCIAL_LINKS } from '../../../data/profile.data';
import { SocialLinks } from './social-links';

describe('SocialLinks', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [SocialLinks] }).compileComponents();
    const fixture = TestBed.createComponent(SocialLinks);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders one link per entry, each with an accessible name', async () => {
    const host = await render();
    const links = host.querySelectorAll('a');
    expect(links.length).toBe(SOCIAL_LINKS.length);
    for (const link of Array.from(links)) {
      expect(link.getAttribute('aria-label')?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it('opens web profiles in a new tab safely, but not the email link', async () => {
    const host = await render();
    for (const social of SOCIAL_LINKS) {
      const link = host.querySelector(`a[href="${social.url}"]`);
      if (social.icon === 'mail') {
        expect(link?.hasAttribute('target')).toBe(false);
      } else {
        expect(link?.getAttribute('target')).toBe('_blank');
        expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
      }
    }
  });
});