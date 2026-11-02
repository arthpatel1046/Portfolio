import { TestBed } from '@angular/core/testing';

import { App } from './app';

function accessibleName(element: Element): string {
  const label = element.getAttribute('aria-label');
  return (label ?? element.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function describeElement(element: Element): string {
  return `<${element.tagName.toLowerCase()} class="${element.getAttribute('class') ?? ''}">`;
}

describe('page accessibility structure', () => {
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('has exactly one h1 and one main landmark', () => {
    expect(host.querySelectorAll('h1').length).toBe(1);
    expect(host.querySelectorAll('main').length).toBe(1);
  });

  it('never skips a heading level', () => {
    let previous = 0;
    for (const heading of Array.from(host.querySelectorAll('h1, h2, h3, h4, h5, h6'))) {
      const level = Number(heading.tagName.slice(1));
      expect(level - previous, `${heading.tagName} after h${previous}`).toBeLessThanOrEqual(1);
      previous = level;
    }
  });

  it('gives every link and button an accessible name', () => {
    for (const element of Array.from(host.querySelectorAll('a, button'))) {
      expect(accessibleName(element), describeElement(element)).not.toBe('');
    }
  });

  it('uses unique ids and valid id references', () => {
    const seen = new Set<string>();
    for (const element of Array.from(host.querySelectorAll('[id]'))) {
      expect(seen.has(element.id), `duplicate id "${element.id}"`).toBe(false);
      seen.add(element.id);
    }

    for (const attribute of ['aria-labelledby', 'aria-controls']) {
      for (const element of Array.from(host.querySelectorAll(`[${attribute}]`))) {
        const target = element.getAttribute(attribute) ?? '';
        expect(host.querySelector(`#${target}`), `${attribute}="${target}"`).not.toBeNull();
      }
    }
  });

  it('opens new-tab links safely', () => {
    for (const link of Array.from(host.querySelectorAll('a[target="_blank"]'))) {
      expect(link.getAttribute('rel') ?? '', describeElement(link)).toContain('noopener');
    }
  });

  it('labels every navigation landmark', () => {
    for (const nav of Array.from(host.querySelectorAll('nav'))) {
      expect(nav.getAttribute('aria-label') ?? '', describeElement(nav)).not.toBe('');
    }
  });

  it('hides decorative SVGs from assistive technology', () => {
    for (const svg of Array.from(host.querySelectorAll('svg'))) {
      expect(svg.closest('[aria-hidden="true"]'), describeElement(svg)).not.toBeNull();
    }
  });

  it('never uses a positive tabindex', () => {
    for (const element of Array.from(host.querySelectorAll('[tabindex]'))) {
      expect(Number(element.getAttribute('tabindex')), describeElement(element)).toBeLessThanOrEqual(0);
    }
  });
});