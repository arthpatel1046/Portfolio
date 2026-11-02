import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDownload, LucideMail } from '@lucide/angular';

import { PROFILE } from '../../data/profile.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { SocialLinks } from '../../shared/components/social-links/social-links';
import { Reveal } from '../../shared/directives/reveal';
import { Spotlight } from '../../shared/directives/spotlight';

@Component({
  selector: 'arth-contact',
  imports: [GlassCard, SocialLinks, Reveal, Spotlight, LucideMail, LucideDownload],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = PROFILE;
}