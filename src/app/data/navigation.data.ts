import type { NavItem } from '../models/nav-item';

/** The hero is the top of the page; it has no link of its own (the logo goes there). */
export const HOME_ID = 'home';

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'principles', label: 'Principles' },
  { id: 'contact', label: 'Contact', cta: true },
];

/** Every section id in page order. ScrollSpy watches these. */
export const SECTION_IDS: readonly string[] = [HOME_ID, ...NAV_ITEMS.map((item) => item.id)];