import { TestBed } from '@angular/core/testing';

import { EventsListService } from './events-list.service';

describe('EventsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsListService = TestBed.get(EventsListService);
    expect(service).toBeTruthy();
  });
});
