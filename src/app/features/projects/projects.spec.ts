import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Motion } from '../../core/motion/motion';
import { PROJECTS } from '../../data/projects.data';
import { GALLERY_CONDITION, Projects } from './projects';

describe('Projects', () => {
  const stop = vi.fn();
  const run = vi.fn();

  beforeEach(async () => {
    stop.mockReset();
    run.mockReset();
    run.mockReturnValue(stop);

    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [{ provide: Motion, useValue: { run } }],
    }).compileComponents();
  });

  async function render() {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('is a labelled section with one card per project', async () => {
    const fixture = await render();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('section')?.getAttribute('aria-labelledby')).toBe('projects-title');
    expect(host.querySelectorAll('arth-project-card').length).toBe(PROJECTS.length);
  });

  it('asks for the pinned gallery only on large, tall, motion-friendly screens', async () => {
    await render();
    expect(run).toHaveBeenCalledWith(expect.any(Function), GALLERY_CONDITION);
    expect(GALLERY_CONDITION).toBe('(min-width: 64rem) and (min-height: 42rem)');
  });

  it('stops the gallery when destroyed', async () => {
    const fixture = await render();
    fixture.destroy();
    expect(stop).toHaveBeenCalled();
  });
});