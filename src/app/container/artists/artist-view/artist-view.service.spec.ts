import { TestBed } from '@angular/core/testing';

import { ArtistViewService } from './artist-view.service';

describe('ArtistViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistViewService = TestBed.get(ArtistViewService);
    expect(service).toBeTruthy();
  });
});
