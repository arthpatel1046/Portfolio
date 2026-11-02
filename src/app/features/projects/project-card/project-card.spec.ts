import { TestBed } from '@angular/core/testing';

import type { Project } from '../../../models/project';
import { ProjectCard } from './project-card';

const PUBLIC_PROJECT: Project = {
  id: 'demo',
  title: 'Demo Project',
  tagline: 'A tagline',
  description: 'A description',
  tags: ['Angular', 'SCSS'],
  links: [{ label: 'Source', url: 'https://example.com/source', kind: 'source' }],
};

const PRIVATE_PROJECT: Project = {
  ...PUBLIC_PROJECT,
  id: 'private',
  links: [],
  note: 'Proprietary project.',
};

describe('ProjectCard', () => {
  async function render(project: Project): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [ProjectCard] }).compileComponents();
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the title, a generated cover with initials, and every tag', async () => {
    const host = await render(PUBLIC_PROJECT);
    expect(host.querySelector('.card__title')?.textContent).toBe('Demo Project');
    expect(host.querySelector('.card__initials')?.textContent).toBe('DP');
    expect(host.querySelectorAll('.chip').length).toBe(2);
  });

  it('opens links safely in a new tab', async () => {
    const host = await render(PUBLIC_PROJECT);
    const link = host.querySelector<HTMLAnchorElement>('.card__link');
    expect(link?.getAttribute('href')).toBe('https://example.com/source');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('shows the note instead of links when there is nothing public', async () => {
    const host = await render(PRIVATE_PROJECT);
    expect(host.querySelector('.card__link')).toBeNull();
    expect(host.querySelector('.card__note')?.textContent).toContain('Proprietary project.');
  });
});