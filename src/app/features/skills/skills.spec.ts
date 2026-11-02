import { TestBed } from '@angular/core/testing';

import { SKILL_CATEGORIES } from '../../data/skills.data';
import { Skills } from './skills';

describe('Skills', () => {
  it('renders one card per category with every skill as a chip', async () => {
    await TestBed.configureTestingModule({ imports: [Skills] }).compileComponents();
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const totalSkills = SKILL_CATEGORIES.reduce((sum, category) => sum + category.skills.length, 0);

    expect(host.querySelectorAll('arth-glass-card').length).toBe(SKILL_CATEGORIES.length);
    expect(host.querySelectorAll('.chip').length).toBe(totalSkills);
  });
});