export interface ExperienceEntry {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location?: string;
  /** Display strings, e.g. "Jun 2025". */
  readonly start: string;
  /** Leave out for one-off entries such as "Summer 2020"; use "Present" for a current role. */
  readonly end?: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
}