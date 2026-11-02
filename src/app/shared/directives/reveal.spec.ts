import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Motion } from '../../core/motion/motion';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<p arthReveal arthRevealDelay="0.2">Hello</p>`,
})
class TestHost {}

describe('Reveal', () => {
  const stop = vi.fn();
  const run = vi.fn();

  beforeEach(async () => {
    stop.mockReset();
    run.mockReset();
    run.mockReturnValue(stop);

    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [{ provide: Motion, useValue: { run } }],
    }).compileComponents();
  });

  it('registers its animation once after the first render', async () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it('stops and reverts its animation when the element is destroyed', async () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.destroy();
    expect(stop).toHaveBeenCalledTimes(1);
  });
});