import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Spotlight } from './spotlight';

@Component({
  imports: [Spotlight],
  template: `<div arthSpotlight></div>`,
})
class TestHost {}

describe('Spotlight', () => {
  beforeEach(async () => {
    // Mouse-like pointer, motion allowed.
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('hover') }));
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = (fixture.nativeElement as HTMLElement).querySelector('div');
    if (!element) {
      throw new Error('Missing host element');
    }
    return element;
  }

  it('adds the styling hook class', async () => {
    const element = await render();
    expect(element.classList.contains('has-spotlight')).toBe(true);
  });

  it('writes the pointer position into CSS variables', async () => {
    const element = await render();
    element.dispatchEvent(new MouseEvent('pointermove', { clientX: 40, clientY: 25 }));
    expect(element.style.getPropertyValue('--mx')).toBe('40px');
    expect(element.style.getPropertyValue('--my')).toBe('25px');
  });

  it('stays still when reduced motion is requested', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const element = await render();
    element.dispatchEvent(new MouseEvent('pointermove', { clientX: 40, clientY: 25 }));
    expect(element.style.getPropertyValue('--mx')).toBe('');
  });
});