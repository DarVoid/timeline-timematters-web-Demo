import { TestBed } from '@angular/core/testing';

import { GetarticleService } from './getarticle.service';

describe('GetarticleService', () => {
  let service: GetarticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetarticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
