import { TestBed } from '@angular/core/testing';

import { ToasterNotiService } from './toaster-noti.service';

describe('ToasterNotiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToasterNotiService = TestBed.get(ToasterNotiService);
    expect(service).toBeTruthy();
  });
});
