import { TestBed } from '@angular/core/testing';

import { BodyShapesService } from './body-shapes.service';

describe('BodyShapesService', () => {
  let service: BodyShapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyShapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
