export interface SkillCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly skills: readonly string[];
}