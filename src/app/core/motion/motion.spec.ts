import { TestBed } from '@angular/core/testing';
import { gsap } from 'gsap';
import { vi } from 'vitest';

import { Motion } from './motion';

describe('Motion', () => {
  const add = vi.fn();
  const revert = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    vi.spyOn(gsap, 'registerPlugin').mockImplementation(() => undefined);
    vi.spyOn(gsap, 'matchMedia').mockReturnValue({ add, revert } as unknown as gsap.MatchMedia);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    add.mockReset();
    revert.mockReset();
  });

  it('only animates while reduced motion is NOT requested', () => {
    TestBed.inject(Motion).run(() => undefined);
    expect(add).toHaveBeenCalledWith('(prefers-reduced-motion: no-preference)', expect.any(Function));
  });

  it('can narrow the condition further', () => {
    TestBed.inject(Motion).run(() => undefined, '(hover: hover)');
    expect(add).toHaveBeenCalledWith('(prefers-reduced-motion: no-preference) and (hover: hover)', expect.any(Function));
  });

  it('runs the setup function and reverts everything when stopped', () => {
    const setup = vi.fn();
    const stop = TestBed.inject(Motion).run(setup);

    const registered = add.mock.calls[0]?.[1] as () => void;
    registered();
    expect(setup).toHaveBeenCalledTimes(1);

    stop();
    expect(revert).toHaveBeenCalledTimes(1);
  });

  it('does nothing where matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    const stop = TestBed.inject(Motion).run(() => undefined);
    stop();
    expect(add).not.toHaveBeenCalled();
    expect(revert).not.toHaveBeenCalled();
  });
});