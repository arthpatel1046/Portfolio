import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Spotlight } from '../../directives/spotlight';

/**
 * Frosted-glass surface. Content is projected in; the cursor light comes from the
 * Spotlight directive, attached to this component's own element via hostDirectives.
 */
@Component({
  selector: 'arth-glass-card',
  hostDirectives: [Spotlight],
  templateUrl: './glass-card.html',
  styleUrl: './glass-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassCard {}