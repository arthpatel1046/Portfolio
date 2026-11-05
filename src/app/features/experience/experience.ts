import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';

import { Motion } from '../../core/motion/motion';
import { EXPERIENCE } from '../../data/experience.data';
import { GlassCard } from '../../shared/components/glass-card/glass-card';
import { Reveal } from '../../shared/directives/reveal';
import { Tilt } from '../../shared/directives/tilt';

@Component({
  selector: 'arth-experience',
  imports: [GlassCard, Reveal, Tilt],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly entries = EXPERIENCE;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = this.motion.run(() => {
        const timeline = this.host.querySelector<HTMLElement>('.timeline');
        const progress = this.host.querySelector<HTMLElement>('.timeline__progress');
        if (!timeline || !progress) {
          return;
        }

        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: 0.5,
            },
          },
        );
      });
      destroyRef.onDestroy(stop);
    });
  }
}