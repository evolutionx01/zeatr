import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenueModalComponent } from './add-venue-modal.component';

describe('AddVenueModalComponent', () => {
  let component: AddVenueModalComponent;
  let fixture: ComponentFixture<AddVenueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVenueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVenueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
