import { TestBed } from '@angular/core/testing';

import { PRINCIPLES } from '../../data/principles.data';
import { Principles } from './principles';

describe('Principles', () => {
  it('renders every principle with zero-padded numbering', async () => {
    await TestBed.configureTestingModule({ imports: [Principles] }).compileComponents();
    const fixture = TestBed.createComponent(Principles);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const numbers = [...host.querySelectorAll('.principles__number')].map((element) => element.textContent?.trim());

    expect(numbers.length).toBe(PRINCIPLES.length);
    expect(numbers[0]).toBe('01');
  });
});