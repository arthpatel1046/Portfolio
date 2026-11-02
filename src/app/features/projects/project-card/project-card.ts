import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideArrowUpRight, LucideCode, LucideLock } from '@lucide/angular';

import type { Project } from '../../../models/project';
import { GlassCard } from '../../../shared/components/glass-card/glass-card';
import { Tilt } from '../../../shared/directives/tilt';

function initialsOf(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

@Component({
  selector: 'arth-project-card',
  imports: [GlassCard, Tilt, LucideArrowUpRight, LucideCode, LucideLock],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  /** Position in the list; varies the angle of the generated cover gradient. */
  readonly index = input(0);

  protected readonly initials = computed(() => initialsOf(this.project().title));
  protected readonly coverAngle = computed(() => 135 + ((this.index() * 47) % 180));
}