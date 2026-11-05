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
      // The cursor light and mouse-parallax only run with a mouse-like pointer.
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
      const depth = Number(layer.dataset['depth']) || 15;
      gsap.to(layer, {
        yPercent: -depth,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });
    }
  }

  private setupCursorLight(): (() => void) | undefined {
    const light = this.host.querySelector<HTMLElement>('.light');
    const layers = gsap.utils.toArray<HTMLElement>('[data-mouse]', this.host);
    if (!light && layers.length === 0) {
      return undefined;
    }

    const moveX = light ? gsap.quickTo(light, 'x', { duration: 0.7, ease: 'power3' }) : null;
    const moveY = light ? gsap.quickTo(light, 'y', { duration: 0.7, ease: 'power3' }) : null;
    const fadeIn = light ? gsap.to(light, { opacity: 1, duration: 1.2, paused: true }) : null;

    if (light) {
      gsap.set(light, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    const layerMovers = layers.map((layer) => {
      const factor = Number(layer.dataset['mouse']) || 0.02;
      return {
        factor,
        xTo: gsap.quickTo(layer, 'x', { duration: 1.1, ease: 'power3' }),
      };
    });

    let shown = false;

    const onMove = (event: PointerEvent): void => {
      if (!shown && fadeIn) {
        shown = true;
        fadeIn.play();
      }
      moveX?.(event.clientX);
      moveY?.(event.clientY);

      const offsetX = event.clientX - window.innerWidth / 2;
      for (const mover of layerMovers) {
        mover.xTo(offsetX * mover.factor);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }
}