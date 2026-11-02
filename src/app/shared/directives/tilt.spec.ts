import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Motion } from '../../core/motion/motion';
import { Tilt } from './tilt';

@Component({
  imports: [Tilt],
  template: `<div arthTilt></div>`,
})
class TestHost {}

describe('Tilt', () => {
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

  async function render() {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('only runs for mouse-like pointers', async () => {
    await render();
    expect(run).toHaveBeenCalledWith(expect.any(Function), '(hover: hover) and (pointer: fine)');
  });

  it('stops and reverts when the element is destroyed', async () => {
    const fixture = await render();
    fixture.destroy();
    expect(stop).toHaveBeenCalledTimes(1);
  });
});