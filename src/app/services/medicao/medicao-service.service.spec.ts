import { TestBed } from '@angular/core/testing';

import { MedicaoServiceService } from './medicao-service.service';

describe('MedicaoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicaoServiceService = TestBed.get(MedicaoServiceService);
    expect(service).toBeTruthy();
  });
});
