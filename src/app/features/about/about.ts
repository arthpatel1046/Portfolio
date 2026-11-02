import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ABOUT } from '../../data/about.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'arth-about',
  imports: [GlassCard, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly about = ABOUT;
}