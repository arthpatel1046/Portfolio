import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every section placeholder', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    for (const tag of ['arth-navbar', 'arth-hero', 'arth-about', 'arth-skills', 'arth-experience', 'arth-projects', 'arth-principles', 'arth-contact', 'arth-footer']) {
      expect(host.querySelector(tag)).not.toBeNull();
    }
  });
});