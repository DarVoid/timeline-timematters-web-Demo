import { TestBed } from '@angular/core/testing';

import { YakeService } from './yake.service';

describe('YakeService', () => {
  let service: YakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
