import { TestBed } from '@angular/core/testing';

import { UsersellerService } from './userseller.service';

describe('UsersellerService', () => {
  let service: UsersellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
