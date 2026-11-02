import type { Project } from '../models/project';

// TODO: check with your employers what you may say publicly about Metaagrow, Passtimme and ControlFlow.
// To add a screenshot: save it as public/images/projects/<name>.webp, then add
//   image: { src: 'images/projects/<name>.webp', alt: '…', width: 1200, height: 750 }
// (the path has no leading slash so it also works under the /Portfolio/ base path).
const PROPRIETARY = 'Proprietary employer project, so there is no public link.';

export const PROJECTS: readonly Project[] = [
  {
    id: 'metaagrow-analytics',
    title: 'Metaagrow Analytics',
    tagline: 'Tableau replaced by a custom Angular reporting system',
    description:
      'Load time fell from about 30 seconds to under 3 and 1-hour refresh delays disappeared. KPIs now update in real time across 6 modules covering 10,000+ assets at 11 properties.',
    role: 'Front-end developer',
    tags: ['Angular', 'TypeScript', 'RxJS', 'ApexCharts', 'REST APIs'],
    links: [],
    note: PROPRIETARY,
  },
  {
    id: 'metaagrow-dashboards',
    title: 'Metaagrow Dashboards',
    tagline: 'Customisable layouts and PDF export',
    description:
      'Drag-and-drop widget reordering and show/hide with Angular CDK, saved per user by a custom WidgetLayoutService, plus multi-page PDF export with jsPDF and html2canvas.',
    role: 'Front-end developer',
    tags: ['Angular CDK', 'RxJS', 'jsPDF', 'html2canvas'],
    links: [],
    note: PROPRIETARY,
  },
  {
    id: 'passtimme',
    title: 'Passtimme',
    tagline: 'Fintech-enabled leisure marketplace',
    description:
      'Location-based venue discovery with the Google Maps API (radius, city and category filters) for 1,000+ listings, and a multi-step vendor onboarding flow with Reactive Forms and route guards on MongoDB-backed REST APIs.',
    role: 'Front-end developer',
    tags: ['Angular', 'Reactive Forms', 'Google Maps API', 'MongoDB'],
    links: [],
    note: PROPRIETARY,
  },
  {
    id: 'controlflow',
    title: 'ControlFlow',
    tagline: 'Multi-client admin panel on a Spring Boot back end',
    description:
      'A server-rendered admin panel built with Spring Boot, Thymeleaf and MySQL. It consolidated 5+ client accounts into one real-time dashboard, cut admin task overhead by about 40%, and introduced shared Thymeleaf fragments used platform-wide.',
    role: 'Back-end & UI developer',
    year: '2024',
    tags: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'REST API'],
    links: [],
    note: PROPRIETARY,
  },
  {
    id: 'spoken-tutorial',
    title: 'Spoken Tutorial Platform',
    tagline: 'Built for IIT Bombay',
    description:
      'Led a four-member team that built and deployed a web platform for The Spoken Tutorial Project at IIT Bombay. The work received Government of India copyright recognition.',
    role: 'Team lead',
    year: '2020',
    tags: ['IIT Bombay', 'Copyright recognised'],
    links: [],
  },
  {
    id: 'portfolio',
    title: 'Arth Portfolio',
    tagline: 'This site',
    description:
      'A hand-built Angular portfolio: standalone components and signals, GSAP ScrollTrigger parallax, a glassmorphism design system, and an animation layer that respects reduced-motion preferences.',
    year: '2026',
    tags: ['Angular', 'TypeScript', 'GSAP', 'SCSS'],
    links: [{ label: 'Source', url: 'https://github.com/arthpatel1046/Portfolio', kind: 'source' }],
  },
];