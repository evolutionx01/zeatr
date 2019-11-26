import { TestBed } from '@angular/core/testing';

import { LandingpageViewService } from './landingpage-view.service';

describe('LandingpageViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandingpageViewService = TestBed.get(LandingpageViewService);
    expect(service).toBeTruthy();
  });
});
