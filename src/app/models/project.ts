export interface ProjectLink {
  /** Link text, e.g. "Live site" or "Source". */
  readonly label: string;
  readonly url: string;
  /** Picks the icon: an up-right arrow for "live" (the default) or a code icon for "source". */
  readonly kind?: 'live' | 'source';
}

export interface ProjectImage {
  /** Path relative to the site root, e.g. "images/projects/example.webp" (no leading slash). */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly role?: string;
  readonly year?: string;
  readonly tags: readonly string[];
  readonly image?: ProjectImage;
  readonly links: readonly ProjectLink[];
  /** Shown instead of links when there is nothing public to link to. */
  readonly note?: string;
}