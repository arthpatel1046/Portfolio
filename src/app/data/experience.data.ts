import type { ExperienceEntry } from '../models/experience-entry';

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'synccit',
    role: 'Junior Angular Developer',
    company: 'Synccit Solutions Pvt. Ltd.',
    start: 'Jun 2025',
    end: 'Present',
    summary:
      'Front-end developer on Metaagrow, a cloud-based O&M / CMMS platform, and on Passtimme, a fintech-enabled leisure marketplace.',
    highlights: [
      'Replaced Tableau with a custom Angular reporting system: load time fell from about 30 seconds to under 3, 1-hour refresh delays disappeared, and KPIs update in real time across 6 modules.',
      'Own six feature modules end to end (Assets, Inspections, Preventive Maintenance, Parts Inventory, Tickets, Survey), built with lazy loading and Angular services for 10,000+ assets across 11 international properties.',
      'Led a UI/UX audit that produced a 29-section design system with a three-tier colour and token architecture, adopted across the Metaagrow dashboard.',
      'Built a drag-and-drop dashboard (reorder and show/hide widgets) with Angular CDK, persisted per user through a custom WidgetLayoutService.',
      'Built multi-page PDF export with jsPDF and html2canvas, and integrated parallel REST APIs with RxJS forkJoin and takeUntil.',
      'Passtimme: built location-based venue discovery with the Google Maps API for 1,000+ listings, plus multi-step vendor onboarding with Reactive Forms, route guards and MongoDB-backed REST APIs.',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'ApexCharts', 'Angular CDK', 'REST APIs', 'Google Maps API'],
  },
  {
    id: 'reeble',
    role: 'Junior Software Developer',
    company: 'Reeble',
    start: 'Jul 2024',
    end: 'Jan 2025',
    summary:
      'Back-end and UI developer on ControlFlow, a multi-client admin panel built with Spring Boot, Thymeleaf and MySQL.',
    highlights: [
      'Built server-side rendered admin views with Spring Boot and Thymeleaf, consolidating 5+ client accounts into one dashboard with real-time data updates and cutting admin task overhead by about 40%.',
      'Designed shared Thymeleaf fragments for client detail views, edit workflows and bulk data management, adopted platform-wide to cut per-feature UI development time.',
    ],
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'REST API', 'MySQL'],
  },
  {
    id: 'sakec',
    role: 'Team Lead, Web Development (Internship)',
    company: 'Shah & Anchor Kutchhi Engineering College',
    start: 'Summer 2020',
    summary: 'Led a 4-member team that built and deployed a web platform for The Spoken Tutorial Project (IIT Bombay).',
    highlights: ['The platform received Government of India Copyright recognition (No. L-125626/2023).'],
    technologies: [],
  },
];