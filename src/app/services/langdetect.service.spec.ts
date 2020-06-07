import { TestBed } from '@angular/core/testing';

import { LangdetectService } from './langdetect.service';

describe('LangdetectService', () => {
  let service: LangdetectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangdetectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
