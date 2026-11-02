import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideArrowUp } from '@lucide/angular';

import { ScrollSpy } from '../../../core/services/scroll-spy';
import { HOME_ID } from '../../../data/navigation.data';
import { PROFILE } from '../../../data/profile.data';
import { SocialLinks } from '../social-links/social-links';

@Component({
  selector: 'arth-footer',
  imports: [SocialLinks, LucideArrowUp],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly spy = inject(ScrollSpy);
  protected readonly profile = PROFILE;
  protected readonly homeId = HOME_ID;
  protected readonly year = new Date().getFullYear();
}