import { TestBed } from '@angular/core/testing';

import { DispensacaoServiceService } from './dispensacao-service.service';

describe('DispensacaoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispensacaoServiceService = TestBed.get(DispensacaoServiceService);
    expect(service).toBeTruthy();
  });
});
