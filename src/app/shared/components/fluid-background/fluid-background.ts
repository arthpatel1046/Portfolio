import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { gsap } from 'gsap';

import { Motion } from '../../../core/motion/motion';

@Component({
  selector: 'arth-fluid-background',
  templateUrl: './fluid-background.html',
  styleUrl: './fluid-background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class.is-paused]': 'paused()',
    '(document:visibilitychange)': 'onVisibilityChange()',
  },
})
export class FluidBackground {
  readonly paused = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stopParallax = this.motion.run(() => this.setupParallax());
      // The cursor light only makes sense with a mouse-like pointer.
      const stopLight = this.motion.run(() => this.setupCursorLight(), '(hover: hover) and (pointer: fine)');

      destroyRef.onDestroy(() => {
        stopParallax();
        stopLight();
      });
    });
  }

  onVisibilityChange(): void {
    this.paused.set(document.hidden);
  }

  /** Each layer drifts up at its own speed (data-depth, % of its height) across the whole page scroll. */
  private setupParallax(): void {
    for (const layer of gsap.utils.toArray<HTMLElement>('[data-depth]', this.host)) {
      gsap.to(layer, {
        yPercent: -Number(layer.dataset['depth']),
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });
    }
  }

  private setupCursorLight(): (() => void) | undefined {
    const light = this.host.querySelector<HTMLElement>('.light');
    if (!light) {
      return undefined;
    }

    gsap.set(light, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const moveX = gsap.quickTo(light, 'x', { duration: 0.8, ease: 'power3' });
    const moveY = gsap.quickTo(light, 'y', { duration: 0.8, ease: 'power3' });
    const fadeIn = gsap.to(light, { opacity: 1, duration: 1.2, paused: true });
    let shown = false;

    const onMove = (event: PointerEvent): void => {
      if (!shown) {
        shown = true;
        fadeIn.play();
      }
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }
}