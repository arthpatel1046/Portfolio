import { afterNextRender, DestroyRef, Directive, inject, input, ElementRef, numberAttribute } from '@angular/core';
import { gsap } from 'gsap';

import { Motion } from '../../core/motion/motion';

/**
 * Fades and lifts an element in once, the first time it scrolls into view.
 *   <section arthReveal> … </section>
 *   <p arthReveal arthRevealDelay="0.2"> … </p>
 * With reduced motion the element is simply visible; nothing is hidden or animated.
 */
@Directive({ selector: '[arthReveal]' })
export class Reveal {
  /** Extra seconds to wait after the element enters the viewport. */
  readonly delay = input(0, { alias: 'arthRevealDelay', transform: numberAttribute });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => {
        gsap.from(this.element, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          delay: this.delay(),
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: this.element, start: 'top 88%', once: true },
        });
      });
      destroyRef.onDestroy(stop);
    });
  }
}