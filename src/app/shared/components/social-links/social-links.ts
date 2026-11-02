import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideMail } from '@lucide/angular';

import { SOCIAL_LINKS } from '../../../data/profile.data';

/** Icon links to GitHub, LinkedIn and email. Lucide v1 has no brand logos, so those two are inline SVGs. */
@Component({
  selector: 'arth-social-links',
  imports: [LucideMail],
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinks {
  protected readonly links = SOCIAL_LINKS;
}