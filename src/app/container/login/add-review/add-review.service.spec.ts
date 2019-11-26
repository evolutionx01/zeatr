import { TestBed } from '@angular/core/testing';

import { AddReviewService } from './add-review.service';

describe('AddReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddReviewService = TestBed.get(AddReviewService);
    expect(service).toBeTruthy();
  });
});
