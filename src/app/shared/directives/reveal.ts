import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';
import { gsap } from 'gsap';

import { Motion } from '../../core/motion/motion';

/**
 * Fades and lifts an element in when it scrolls into view, scrubs vertical parallax
 * when [arthParallax] is set, and scrubs the iOS Liquid Glass mirror reflection
 * (--scroll-angle and --mirror-shift) along the card border as the user scrolls.
 */
@Directive({ selector: '[arthReveal]' })
export class Reveal {
  /** Extra seconds to wait after the element enters the viewport. */
  readonly delay = input(0, { alias: 'arthRevealDelay', transform: numberAttribute });

  /** Optional vertical parallax offset in pixels scrubbed across the viewport. */
  readonly parallax = input(0, { alias: 'arthParallax', transform: numberAttribute });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => {
        gsap.from(this.element, {
          autoAlpha: 0,
          y: 40,
          scale: 0.97,
          duration: 0.95,
          delay: this.delay(),
          ease: 'expo.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: this.element, start: 'top 88%', once: true },
        });

        // Scrub the iOS mirror rim reflection angle and lens shimmer as the user scrolls
        gsap.fromTo(
          this.element,
          { '--scroll-angle': '110deg', '--mirror-shift': '0%' },
          {
            '--scroll-angle': '250deg',
            '--mirror-shift': '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: this.element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.35,
            },
          },
        );

        const shift = this.parallax();
        if (shift !== 0) {
          gsap.fromTo(
            this.element,
            { y: -shift },
            {
              y: shift,
              ease: 'none',
              scrollTrigger: {
                trigger: this.element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        }
      });
      destroyRef.onDestroy(stop);
    });
  }
}