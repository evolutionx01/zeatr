import { TestBed } from '@angular/core/testing';

import { AddEventModalService } from './add-event-modal.service';

describe('AddEventModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEventModalService = TestBed.get(AddEventModalService);
    expect(service).toBeTruthy();
  });
});
