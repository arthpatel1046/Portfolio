import { TestBed } from '@angular/core/testing';
import { ScrollSpy } from './scroll-spy';

describe('ScrollSpy', () => {
  let service: ScrollSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
