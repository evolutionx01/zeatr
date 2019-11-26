import { TestBed } from '@angular/core/testing';

import { FollowerViewService } from './follower-view.service';

describe('FollowerViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowerViewService = TestBed.get(FollowerViewService);
    expect(service).toBeTruthy();
  });
});
