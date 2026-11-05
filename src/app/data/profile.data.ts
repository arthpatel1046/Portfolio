import type { SocialLink } from '../models/social-link';

// Everything the hero, contact section and footer say about you lives here.
// Your phone number is deliberately NOT on the public site (scrapers harvest numbers).
export const PROFILE = {
  name: 'Arth',
  firstName: 'Arth',
  lastName: '',
  initials: 'A',
  role: 'Full-Stack Developer · Angular + Spring Boot',
  headline: 'I build data-driven web apps, from Angular interfaces to Spring Boot back ends.',
  intro:
    'Full-stack developer with close to two years of experience building data-driven web apps for B2B SaaS platforms. I replaced a Tableau reporting setup with a custom Angular system, cutting a live platform\u2019s load time from 30 seconds to under 3.',
  email: 'arthpatel1046@gmail.com',
  location: 'Mumbai, India',
  // Relative path (no leading slash) so it also works under the /Portfolio/ base path.
  resume: { url: 'resume/ArthPatel.pdf', fileName: 'ArthPatel.pdf' },
} as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub profile', url: 'https://github.com/arthpatel1046', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn profile', url: 'https://www.linkedin.com/in/arthpatel46', icon: 'linkedin' },
  { id: 'email', label: 'Send an email', url: `mailto:${PROFILE.email}`, icon: 'mail' },
];