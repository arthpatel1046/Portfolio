import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Motion } from '../../core/motion/motion';
import { PROJECTS } from '../../data/projects.data';
import { Reveal } from '../../shared/directives/reveal';
import { ProjectCard } from './project-card/project-card';

/**
 * The pinned horizontal gallery only runs on large, tall screens where motion is allowed.
 * Everywhere else (phones, short windows, reduced motion) the cards stay in a normal grid.
 * The width matches the 'lg' breakpoint in styles/_mixins.scss.
 */
export const GALLERY_CONDITION = '(min-width: 64rem) and (min-height: 42rem)';

@Component({
  selector: 'arth-projects',
  imports: [ProjectCard, Reveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => this.setupGallery(), GALLERY_CONDITION);
      destroyRef.onDestroy(stop);
    });
  }

  private setupGallery(): () => void {
    const section = this.host.querySelector<HTMLElement>('.showcase');
    const track = this.host.querySelector<HTMLElement>('.showcase__track');
    const bar = this.host.querySelector<HTMLElement>('.showcase__progress-bar');
    if (!section || !track) {
      return () => undefined;
    }

    // Switch the CSS to the horizontal layout BEFORE measuring anything.
    this.host.classList.add('is-horizontal');

    const distance = (): number => Math.max(track.scrollWidth - section.clientWidth, 0);
    const end = (): string => `+=${distance()}`;

    // One vertical scroll range, equal to the sideways distance, moves the track left.
    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end, scrub: true, invalidateOnRefresh: true } },
      );
    }

    // Tabbing to an off-screen card must bring it into view: scroll the page to the matching progress.
    const onFocusIn = (event: FocusEvent): void => {
      const card = (event.target as HTMLElement).closest<HTMLElement>('.showcase__item');
      const trigger = slide.scrollTrigger;
      const max = distance();
      if (!card || !trigger || max === 0) {
        return;
      }
      const leftPadding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const wanted = Math.min(Math.max(card.offsetLeft - leftPadding, 0), max);
      window.scrollTo({ top: trigger.start + (wanted / max) * (trigger.end - trigger.start) });
    };
    track.addEventListener('focusin', onFocusIn);

    // Pinning adds scroll distance, so every trigger further down the page must recalculate.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      track.removeEventListener('focusin', onFocusIn);
      this.host.classList.remove('is-horizontal');
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }
}