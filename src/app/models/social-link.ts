export interface SocialLink {
  readonly id: string;
  /** Accessible name, e.g. "GitHub profile". */
  readonly label: string;
  readonly url: string;
  /** Which mark to draw. Lucide v1 has no brand logos, so github/linkedin are inline SVGs. */
  readonly icon: 'github' | 'linkedin' | 'mail';
}