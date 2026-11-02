import type { Principle } from '../models/principle';

// Draft copy: edit freely. Keep the ones you genuinely believe.
export const PRINCIPLES: readonly Principle[] = [
  {
    id: 'reusable-components',
    title: 'Small, reusable components',
    description:
      'Standalone components with clear inputs. When a pattern shows up twice, it becomes a shared component instead of a copy.',
  },
  {
    id: 'single-source',
    title: 'One source of truth for data',
    description:
      'A central API layer and shared state, so every screen reads from the same place and stays consistent.',
  },
  {
    id: 'design-tokens',
    title: 'Design tokens over one-off styles',
    description:
      'Colour, spacing and type live in tokens, so a redesign is a change in one place rather than a hunt through stylesheets.',
  },
  {
    id: 'measure-first',
    title: 'Measure first, then optimise',
    description:
      'Profile before guessing. Lean change detection, lazy work and fewer round trips beat clever micro-tuning.',
  },
  {
    id: 'accessible',
    title: 'Accessible by default',
    description:
      'Semantic HTML, keyboard support, readable contrast and respect for reduced-motion preferences from the first commit.',
  },
  {
    id: 'small-changes',
    title: 'Small, reviewable changes',
    description:
      'Ship in small steps with clear commits, so every change is easy to review, test and roll back.',
  },
];