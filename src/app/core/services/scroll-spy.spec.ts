import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ScrollSpy } from './scroll-spy';

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  readonly observed: Element[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.observed.push(element);
  }

  unobserve(): void {
    /* not needed */
  }

  disconnect(): void {
    this.observed.length = 0;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(target: Element, isIntersecting: boolean): void {
    this.callback([{ target, isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
}

function latestObserver(): FakeIntersectionObserver {
  const observer = FakeIntersectionObserver.instances.at(-1);
  if (!observer) {
    throw new Error('No IntersectionObserver was created');
  }
  return observer;
}

describe('ScrollSpy', () => {
  const created: HTMLElement[] = [];
  let spy: ScrollSpy;

  function makeSection(id: string): HTMLElement {
    const element = document.createElement('section');
    element.id = id;
    element.tabIndex = -1;
    element.scrollIntoView = vi.fn();
    document.body.appendChild(element);
    created.push(element);
    return element;
  }

  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    spy = TestBed.inject(ScrollSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    for (const element of created.splice(0)) {
      element.remove();
    }
    history.replaceState(null, '', location.pathname);
  });

  it('observes sections that exist and skips unknown ids', () => {
    const one = makeSection('one');
    const two = makeSection('two');
    spy.observe(['one', 'two', 'missing']);
    expect(latestObserver().observed).toEqual([one, two]);
  });

  it('marks the section that enters the viewport middle as active', () => {
    makeSection('one');
    const two = makeSection('two');
    spy.observe(['one', 'two']);
    latestObserver().trigger(two, true);
    expect(spy.activeId()).toBe('two');
  });

  it('keeps the current section active when another one only leaves', () => {
    const one = makeSection('one');
    spy.observe(['one']);
    latestObserver().trigger(one, true);
    latestObserver().trigger(one, false);
    expect(spy.activeId()).toBe('one');
  });

  it('scrolls smoothly, moves focus and marks the section active', () => {
    const two = makeSection('two');
    spy.goTo('two');
    expect(two.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(document.activeElement).toBe(two);
    expect(spy.activeId()).toBe('two');
  });

  it('jumps instantly when the user prefers reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const one = makeSection('one');
    spy.goTo('one');
    expect(one.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  it('takes over plain clicks but leaves ctrl+click alone', () => {
    makeSection('one');
    const plain = new MouseEvent('click', { cancelable: true });
    spy.goTo('one', plain);
    expect(plain.defaultPrevented).toBe(true);

    const withCtrl = new MouseEvent('click', { cancelable: true, ctrlKey: true });
    spy.goTo('one', withCtrl);
    expect(withCtrl.defaultPrevented).toBe(false);
  });

    it('jumps instantly to the section named in the URL hash', () => {
    const two = makeSection('two');
    history.replaceState(null, '', '#two');

    spy.scrollToHash();

    expect(two.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
    expect(spy.activeId()).toBe('two');
  });

  it('ignores a hash that matches no section', () => {
    history.replaceState(null, '', '#nope');

    spy.scrollToHash();

    expect(spy.activeId()).toBeNull();
  });
});