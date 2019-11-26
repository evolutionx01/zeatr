import { TestBed } from '@angular/core/testing';

import { FeaturedArtistService } from './featured-artist.service';

describe('FeaturedArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturedArtistService = TestBed.get(FeaturedArtistService);
    expect(service).toBeTruthy();
  });
});
