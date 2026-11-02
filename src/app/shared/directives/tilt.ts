import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';
import { gsap } from 'gsap';

import { Motion } from '../../core/motion/motion';

/**
 * Subtle 3D tilt that follows the pointer.
 *   <div arthTilt> … </div>          (6° maximum)
 *   <div [arthTilt]="4"> … </div>    (custom maximum, in degrees)
 * Mouse-like pointers only, and never when reduced motion is requested.
 */
@Directive({ selector: '[arthTilt]' })
export class Tilt {
  readonly maxTilt = input(6, { alias: 'arthTilt', transform: (value: unknown) => numberAttribute(value, 6) });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => {
        const max = this.maxTilt();
        const rotateX = gsap.quickTo(this.element, 'rotationX', { duration: 0.5, ease: 'power3' });
        const rotateY = gsap.quickTo(this.element, 'rotationY', { duration: 0.5, ease: 'power3' });
        gsap.set(this.element, { transformPerspective: 900 });

        const onMove = (event: PointerEvent): void => {
          const rect = this.element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(x * max * 2);
          rotateX(-y * max * 2);
        };
        const onLeave = (): void => {
          rotateX(0);
          rotateY(0);
        };

        // Plain listeners (not template bindings) so pointer moves never schedule change detection.
        this.element.addEventListener('pointermove', onMove, { passive: true });
        this.element.addEventListener('pointerleave', onLeave);
        return () => {
          this.element.removeEventListener('pointermove', onMove);
          this.element.removeEventListener('pointerleave', onLeave);
        };
      }, '(hover: hover) and (pointer: fine)');

      destroyRef.onDestroy(stop);
    });
  }
}