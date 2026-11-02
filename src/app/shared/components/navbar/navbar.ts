import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LucideMenu, LucideX } from '@lucide/angular';

import { ScrollSpy } from '../../../core/services/scroll-spy';
import { HOME_ID, NAV_ITEMS, SECTION_IDS } from '../../../data/navigation.data';
import { PROFILE } from '../../../data/profile.data';

@Component({
  selector: 'arth-navbar',
  imports: [LucideMenu, LucideX],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '(document:keydown.escape)': 'closeMenu(true)',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Navbar {
  protected readonly spy = inject(ScrollSpy);
  protected readonly items = NAV_ITEMS;
  protected readonly homeId = HOME_ID;
  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);

  // Used from the host bindings above, so these are public.
  readonly scrolled = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggle = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Runs once in the browser after the first render, when every section exists in the DOM.
    afterNextRender(() => {
      this.spy.observe(SECTION_IDS);

      // A shared link such as .../#projects: wait two frames so the pinned gallery has measured
      // itself, then jump there. Only scheduled when the URL actually has a hash.
      if (location.hash.length > 1) {
        requestAnimationFrame(() => requestAnimationFrame(() => this.spy.scrollToHash()));
      }

      // A plain passive listener instead of a template binding: scrolling never schedules a
      // change-detection run unless the "scrolled" signal actually flips.
      const onScroll = (): void => this.scrolled.set(window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    if (restoreFocus) {
      this.toggle().nativeElement.focus();
    }
  }

  onDocumentClick(event: Event): void {
    if (this.menuOpen() && !this.host.nativeElement.contains(event.target as Node | null)) {
      this.closeMenu();
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected onLinkClick(event: Event, id: string): void {
    this.closeMenu();
    this.spy.goTo(id, event);
  }
}