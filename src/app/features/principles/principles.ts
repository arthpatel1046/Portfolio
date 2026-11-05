import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PRINCIPLES } from '../../data/principles.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { Reveal } from '../../shared/directives/reveal';
import { Tilt } from '../../shared/directives/tilt';

@Component({
  selector: 'arth-principles',
  imports: [GlassCard, Reveal, Tilt],
  templateUrl: './principles.html',
  styleUrl: './principles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Principles {
  protected readonly principles = PRINCIPLES;
}