import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GlassCard } from './glass-card';

@Component({
  imports: [GlassCard],
  template: `<arth-glass-card><p>Inside</p></arth-glass-card>`,
})
class TestHost {}

describe('GlassCard', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('projects its content', async () => {
    const host = await render();
    expect(host.querySelector('arth-glass-card p')?.textContent).toBe('Inside');
  });

  it('carries the spotlight styling hook from its host directive', async () => {
    const host = await render();
    expect(host.querySelector('arth-glass-card')?.classList.contains('has-spotlight')).toBe(true);
  });
});