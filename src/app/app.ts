import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Experience } from './features/experience/experience';
import { Hero } from './features/hero/hero';
import { Principles } from './features/principles/principles';
import { Projects } from './features/projects/projects';
import { Skills } from './features/skills/skills';
import { FluidBackground } from './shared/components/fluid-background/fluid-background';
import { Footer } from './shared/components/footer/footer';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'arth-root',
  imports: [
    FluidBackground,
    Navbar,
    Hero,
    About,
    Skills,
    Experience,
    Projects,
    Principles,
    Contact,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}