import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluidBackground } from './fluid-background';

describe('FluidBackground', () => {
  let component: FluidBackground;
  let fixture: ComponentFixture<FluidBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidBackground],
    }).compileComponents();

    fixture = TestBed.createComponent(FluidBackground);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
