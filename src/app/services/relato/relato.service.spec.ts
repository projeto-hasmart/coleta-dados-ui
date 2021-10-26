import { TestBed } from '@angular/core/testing';

import { RelatoService } from './relato.service';

describe('RelatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelatoService = TestBed.get(RelatoService);
    expect(service).toBeTruthy();
  });
});
