import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

import { matchesMedia, prefersReducedMotion } from '../../core/motion/media';

/**
 * A soft light that follows the cursor inside the element. It only writes two CSS variables
 * (--mx, --my); the glow itself is drawn by the global .has-spotlight styles.
 * Mouse-like pointers only, and not when reduced motion is requested.
 */
@Directive({
  selector: '[arthSpotlight]',
  host: { class: 'has-spotlight' },
})
export class Spotlight {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion() || !matchesMedia('(hover: hover) and (pointer: fine)')) {
        return;
      }

      let frame = 0;
      let x = 0;
      let y = 0;

      const apply = (): void => {
        frame = 0;
        this.element.style.setProperty('--mx', `${x}px`);
        this.element.style.setProperty('--my', `${y}px`);
      };

      // A plain passive listener (not a template binding): pointer moves must never
      // schedule an Angular change-detection run.
      const onMove = (event: PointerEvent): void => {
        const rect = this.element.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        frame ||= requestAnimationFrame(apply);
      };

      this.element.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        this.element.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(frame);
      });
    });
  }
}