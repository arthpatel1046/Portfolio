import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NO_PREFERENCE = '(prefers-reduced-motion: no-preference)';

/**
 * The only place that talks to GSAP's setup. Animations are created inside gsap.matchMedia(),
 * so they exist only while the user has NOT asked for reduced motion, and everything they
 * created (tweens, ScrollTriggers, listeners) is reverted when the preference flips or stop() runs.
 */
@Injectable({ providedIn: 'root' })
export class Motion {
  private registered = false;

  /**
   * Run `setup` while motion is allowed (optionally narrowed by an extra media condition,
   * e.g. '(hover: hover) and (pointer: fine)'). `setup` may return a cleanup function.
   * Returns a function that stops and reverts everything; call it when the owner is destroyed.
   */
  run(setup: () => void | (() => void), extraCondition?: string): () => void {
    if (typeof window.matchMedia !== 'function') {
      return () => undefined;
    }
    this.ensureRegistered();

    const mm = gsap.matchMedia();
    mm.add(extraCondition ? `${NO_PREFERENCE} and ${extraCondition}` : NO_PREFERENCE, () => setup());
    return () => mm.revert();
  }

  private ensureRegistered(): void {
    if (this.registered) {
      return;
    }
    this.registered = true;

    gsap.registerPlugin(ScrollTrigger);
    // Mobile URL-bar show/hide changes the viewport height; don't recalculate everything on it.
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Web fonts change text metrics, so recalculate scroll positions once they have loaded.
    if ('fonts' in document) {
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }
}