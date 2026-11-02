import type { SkillCategory } from '../models/skill-category';

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Front-end',
    description: 'Where most of my work happens.',
    skills: ['Angular (v17, v21)', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'HTML5', 'CSS3', 'SCSS/SASS'],
  },
  {
    id: 'backend',
    title: 'Back-end',
    description: 'Server-side apps and REST APIs.',
    skills: ['Java', 'Spring Boot', 'Thymeleaf', 'RESTful APIs'],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational and document stores.',
    skills: ['MySQL', 'MongoDB (API integration)'],
  },
  {
    id: 'data-viz',
    title: 'Data viz & export',
    description: 'Charts and reports people can use.',
    skills: ['ApexCharts', 'Chart.js', 'jsPDF', 'html2canvas'],
  },
  {
    id: 'ui',
    title: 'UI & design systems',
    description: 'Consistent, reusable building blocks.',
    skills: ['Angular Material', 'Angular CDK', 'Bootstrap', 'Design tokens', 'Responsive design'],
  },
  {
    id: 'tooling',
    title: 'Tools & practices',
    skills: ['Git', 'Postman', 'VS Code', 'Chrome DevTools', 'Google Maps API', 'Lazy loading', 'Jasmine/Karma', 'Agile/Scrum'],
  },
];