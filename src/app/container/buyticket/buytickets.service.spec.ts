import { TestBed } from '@angular/core/testing';

import { BuyticketsService } from './buytickets.service';

describe('BuyticketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyticketsService = TestBed.get(BuyticketsService);
    expect(service).toBeTruthy();
  });
});
