import { TestBed } from '@angular/core/testing';

import { ApiLinksService } from './api-links.service';

describe('ApiLinksService', () => {
  let service: ApiLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
