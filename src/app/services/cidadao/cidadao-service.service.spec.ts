import { TestBed } from '@angular/core/testing';

import { CidadaoServiceService } from './cidadao-service.service';

describe('CidadaoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CidadaoServiceService = TestBed.get(CidadaoServiceService);
    expect(service).toBeTruthy();
  });
});
