import { EXPERIENCE } from './experience.data';
import { NAV_ITEMS } from './navigation.data';
import { PRINCIPLES } from './principles.data';
import { PROFILE, SOCIAL_LINKS } from './profile.data';
import { PROJECTS } from './projects.data';
import { SKILL_CATEGORIES } from './skills.data';

function expectUniqueIds(items: readonly { readonly id: string }[], name: string): void {
  const ids = items.map((item) => item.id);
  expect(new Set(ids).size, `${name} ids must be unique`).toBe(ids.length);
}

describe('portfolio data', () => {
  it('uses unique ids in every list', () => {
    expectUniqueIds(NAV_ITEMS, 'navigation');
    expectUniqueIds(SKILL_CATEGORIES, 'skill category');
    expectUniqueIds(EXPERIENCE, 'experience');
    expectUniqueIds(PRINCIPLES, 'principle');
    expectUniqueIds(PROJECTS, 'project');
    expectUniqueIds(SOCIAL_LINKS, 'social link');
  });

  it('gives every skill category at least one skill', () => {
    for (const category of SKILL_CATEGORIES) {
      expect(category.skills.length, category.id).toBeGreaterThan(0);
    }
  });

  it('gives every experience entry a summary', () => {
    for (const entry of EXPERIENCE) {
      expect(entry.summary.trim(), entry.id).not.toBe('');
    }
  });

  it('uses https for every project link and a relative path for every project image', () => {
    for (const project of PROJECTS) {
      for (const link of project.links) {
        expect(link.url.startsWith('https://'), `${project.id}: ${link.url}`).toBe(true);
      }
      if (project.image) {
        expect(project.image.src.startsWith('/'), `${project.id} image path`).toBe(false);
      }
    }
  });

  it('uses https or mailto for social links, with the email defined once', () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.url.startsWith('https://') || link.url.startsWith('mailto:'), link.id).toBe(true);
    }
    expect(SOCIAL_LINKS.find((link) => link.icon === 'mail')?.url).toBe(`mailto:${PROFILE.email}`);
  });

  it('points the résumé at a relative path', () => {
    expect(PROFILE.resume.url.startsWith('/')).toBe(false);
  });
});