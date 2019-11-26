import { TestBed } from '@angular/core/testing';

import { EventsViewService } from './events-view.service';

describe('EventsViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsViewService = TestBed.get(EventsViewService);
    expect(service).toBeTruthy();
  });
});
