import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventfollowersComponent } from './eventfollowers.component';

describe('EventfollowersComponent', () => {
  let component: EventfollowersComponent;
  let fixture: ComponentFixture<EventfollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventfollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventfollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
