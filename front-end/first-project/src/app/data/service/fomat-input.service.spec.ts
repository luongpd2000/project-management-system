import { TestBed } from '@angular/core/testing';

import { FomatInputService } from './fomat-input.service';

describe('FomatInputService', () => {
  let service: FomatInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FomatInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
