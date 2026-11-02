import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCE } from '../../data/experience.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'arth-experience',
  imports: [GlassCard, Reveal],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly entries = EXPERIENCE;
}