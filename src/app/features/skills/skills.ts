import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_CATEGORIES } from '../../data/skills.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { Reveal } from '../../shared/directives/reveal';
import { Tilt } from '../../shared/directives/tilt';

@Component({
  selector: 'arth-skills',
  imports: [GlassCard, Reveal, Tilt],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly categories = SKILL_CATEGORIES;
}