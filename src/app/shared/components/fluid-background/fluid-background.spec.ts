import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Motion } from '../../../core/motion/motion';
import { FluidBackground } from './fluid-background';

describe('FluidBackground', () => {
  const stop = vi.fn();
  const run = vi.fn();

  beforeEach(async () => {
    stop.mockReset();
    run.mockReset();
    run.mockReturnValue(stop);

    await TestBed.configureTestingModule({
      imports: [FluidBackground],
      providers: [{ provide: Motion, useValue: { run } }],
    }).compileComponents();
  });

  async function render() {
    const fixture = TestBed.createComponent(FluidBackground);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('is hidden from assistive technology', async () => {
    const fixture = await render();
    expect((fixture.nativeElement as HTMLElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('starts parallax and cursor light, and stops both on destroy', async () => {
    const fixture = await render();
    expect(run).toHaveBeenCalledTimes(2);

    fixture.destroy();
    expect(stop).toHaveBeenCalledTimes(2);
  });

  it('pauses its CSS animations while the tab is hidden', async () => {
    const fixture = await render();
    const host = fixture.nativeElement as HTMLElement;

    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
    await fixture.whenStable();
    expect(host.classList.contains('is-paused')).toBe(true);

    Reflect.deleteProperty(document, 'hidden');
    document.dispatchEvent(new Event('visibilitychange'));
    await fixture.whenStable();
    expect(host.classList.contains('is-paused')).toBe(false);
  });
});