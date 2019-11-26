import { TestBed } from '@angular/core/testing';

import { EventfollowersService } from './eventfollowers.service';

describe('EventfollowersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventfollowersService = TestBed.get(EventfollowersService);
    expect(service).toBeTruthy();
  });
});
