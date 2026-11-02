import { TestBed } from '@angular/core/testing';

import { PROFILE } from '../../data/profile.data';
import { Contact } from './contact';

describe('Contact', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [Contact] }).compileComponents();
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('is a labelled section', async () => {
    const host = await render();
    expect(host.querySelector('section')?.getAttribute('aria-labelledby')).toBe('contact-title');
    expect(host.querySelector('#contact-title')).not.toBeNull();
  });

  it('offers an email link built from the profile', async () => {
    const host = await render();
    const link = host.querySelector<HTMLAnchorElement>('.btn--primary');
    expect(link?.getAttribute('href')).toBe(`mailto:${PROFILE.email}`);
  });

  it('offers a downloadable résumé from a relative path', async () => {
    const host = await render();
    const link = host.querySelector<HTMLAnchorElement>('.btn--ghost');
    expect(link?.getAttribute('href')).toBe(PROFILE.resume.url);
    expect(link?.getAttribute('download')).toBe(PROFILE.resume.fileName);
  });

  it('includes the social links', async () => {
    const host = await render();
    expect(host.querySelector('arth-social-links')).not.toBeNull();
  });
});