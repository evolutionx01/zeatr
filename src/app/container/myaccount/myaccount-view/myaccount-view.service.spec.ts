import { TestBed } from '@angular/core/testing';

import { MyaccountViewService } from './myaccount-view.service';

describe('MyaccountViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyaccountViewService = TestBed.get(MyaccountViewService);
    expect(service).toBeTruthy();
  });
});
