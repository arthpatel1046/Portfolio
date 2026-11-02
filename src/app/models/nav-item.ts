export interface NavItem {
  /** Id of the page section this link scrolls to. Also used in the URL hash. */
  readonly id: string;
  readonly label: string;
  /** Renders the link as a call-to-action pill. */
  readonly cta?: boolean;
}