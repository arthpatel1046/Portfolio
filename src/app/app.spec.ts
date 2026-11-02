import { TestBed } from '@angular/core/testing';

import { App } from './app';
import { SECTION_IDS } from './data/navigation.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every section', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    for (const tag of ['arth-navbar', 'arth-hero', 'arth-about', 'arth-skills', 'arth-experience', 'arth-projects', 'arth-principles', 'arth-contact', 'arth-footer']) {
      expect(host.querySelector(tag), tag).not.toBeNull();
    }
  });

  it('provides a scroll target for every id in the navigation data', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    for (const id of SECTION_IDS) {
      expect(host.querySelector(`#${id}`), id).not.toBeNull();
    }
  });
});