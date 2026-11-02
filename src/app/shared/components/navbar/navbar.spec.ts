import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSpy } from '../../../core/services/scroll-spy';
import { NAV_ITEMS } from '../../../data/navigation.data';
import { Navbar } from './navbar';

function query<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Navbar] }).compileComponents();
    fixture = TestBed.createComponent(Navbar);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('renders a brand link plus one link per navigation item', () => {
    expect(host.querySelectorAll('a').length).toBe(NAV_ITEMS.length + 1);
  });

  it('marks the active section with aria-current', async () => {
    TestBed.inject(ScrollSpy).activeId.set('skills');
    await fixture.whenStable();
    expect(query(host, 'a[href="#skills"]').getAttribute('aria-current')).toBe('location');
    expect(query(host, 'a[href="#about"]').hasAttribute('aria-current')).toBe(false);
  });

  it('toggles the mobile menu and reports it through aria-expanded', async () => {
    const button = query<HTMLButtonElement>(host, '.menu-toggle');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu on Escape and returns focus to the toggle', async () => {
    const button = query<HTMLButtonElement>(host, '.menu-toggle');
    button.click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });
});