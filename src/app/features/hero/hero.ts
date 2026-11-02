import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { LucideArrowDown, LucideArrowRight } from '@lucide/angular';
import { gsap } from 'gsap';

import { Motion } from '../../core/motion/motion';
import { ScrollSpy } from '../../core/services/scroll-spy';
import { PROFILE } from '../../data/profile.data';
import { Spotlight } from '../../shared/directives/spotlight';

@Component({
  selector: 'arth-hero',
  imports: [LucideArrowRight, LucideArrowDown, Spotlight],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly spy = inject(ScrollSpy);
  protected readonly profile = PROFILE;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => {
        // Entrance: each line rises and fades in, one after another.
        gsap.from(gsap.utils.toArray('.hero__item', this.host), {
          autoAlpha: 0,
          y: 36,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.15,
        });

        // Scroll-out: the content drifts up slower than the page and fades, in front of the background.
        gsap.to('.hero__inner', {
          yPercent: -14,
          opacity: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: this.host, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      destroyRef.onDestroy(stop);
    });
  }
}