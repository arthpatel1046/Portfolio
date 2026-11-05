import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideArrowUpRight, LucideCode, LucideLock } from '@lucide/angular';

import type { Project } from '../../../models/project';
import { GlassCard } from '../../../shared/components/glass-card/glass-card';
import { Tilt } from '../../../shared/directives/tilt';

@Component({
  selector: 'arth-project-card',
  imports: [GlassCard, Tilt, LucideArrowUpRight, LucideCode, LucideLock],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  /** Position in the list; used for 01–06 numbering. */
  readonly index = input(0);

  protected readonly numberLabel = computed(() => String(this.index() + 1).padStart(2, '0'));
}