import { TestBed } from '@angular/core/testing';

import { FollowingViewService } from './following-view.service';

describe('FollowingViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowingViewService = TestBed.get(FollowingViewService);
    expect(service).toBeTruthy();
  });
});
