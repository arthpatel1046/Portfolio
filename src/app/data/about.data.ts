import type { Fact } from '../models/fact';

export const ABOUT: { readonly paragraphs: readonly string[]; readonly facts: readonly Fact[] } = {
  paragraphs: [
    "I'm a full-stack developer who builds data-driven web applications: Angular and TypeScript on the front end, Spring Boot and Java behind it. Most of my work so far has been dashboards, reporting and operations tooling for B2B SaaS platforms.",
    'I started on the back end at Reeble, building a multi-client admin panel with Spring Boot, Thymeleaf and MySQL. I then moved to Angular at Synccit Solutions, where I own six feature modules of a live CMMS platform covering 10,000+ assets across 11 international properties.',
    'I hold a B.E. in Computer Engineering from Mumbai University (Shah & Anchor Kutchhi Engineering College). In 2020 I led a four-member team that built a web platform for The Spoken Tutorial Project at IIT Bombay, which received Government of India copyright recognition.',
  ],
  facts: [
    { label: 'Based in', value: 'Mumbai, India' },
    { label: 'Currently', value: 'Junior Angular Developer, Synccit Solutions' },
    { label: 'Stack', value: 'Angular, TypeScript, Java, Spring Boot' },
    { label: 'Education', value: 'B.E. Computer Engineering, Mumbai University (CGPA 8.15 / 10)' },
  ],
};