import { TestBed } from '@angular/core/testing';

import { CarsbymodelService } from './carsbymodel.service';

describe('CarsbymodelService', () => {
  let service: CarsbymodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsbymodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
