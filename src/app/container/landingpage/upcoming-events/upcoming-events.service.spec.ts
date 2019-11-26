import { TestBed } from '@angular/core/testing';

import { UpcomingEventsService } from './upcoming-events.service';

describe('UpcomingEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpcomingEventsService = TestBed.get(UpcomingEventsService);
    expect(service).toBeTruthy();
  });
});
