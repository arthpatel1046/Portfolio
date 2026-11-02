import { Injectable, OnDestroy, signal } from '@angular/core';

import { prefersReducedMotion } from '../motion/media';

/**
 * Tracks which page section is under the middle of the viewport and
 * scrolls to sections on request. Browser-only (this app has no SSR).
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpy implements OnDestroy {
  /** Id of the section currently crossing the viewport's middle line. */
  readonly activeId = signal<string | null>(null);

  private observer: IntersectionObserver | null = null;

  /** Start watching the given section ids (ids with no matching element are skipped). */
  observe(ids: readonly string[]): void {
    this.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // The root margins shrink the "viewport" to a ~1%-tall band at 45% from the top,
    // so exactly one (contiguous) section intersects it at any time.
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeId.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  /**
   * Scroll to a section. Pass the click event from an <a href="#id"> to take over
   * from the browser's default jump. Modified clicks (new tab, etc.) are left alone.
   */
  goTo(id: string, event?: Event): void {
    if (
      event instanceof MouseEvent &&
      (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    ) {
      return;
    }
    event?.preventDefault();

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // Move keyboard/screen-reader focus with the scroll (sections carry tabindex="-1").
    target.focus({ preventScroll: true });
    history.replaceState(null, '', `#${id}`);
    this.activeId.set(id);
  }

  /**
   * Jump (instantly) to the element named in the URL hash, for shared links such as .../#projects.
   * The browser can't do this itself because the page is built by JavaScript after it loads.
   */
  scrollToHash(): void {
    const id = location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    this.activeId.set(id);
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}