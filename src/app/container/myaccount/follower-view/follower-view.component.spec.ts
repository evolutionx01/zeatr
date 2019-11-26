import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerViewComponent } from './follower-view.component';

describe('FollowerViewComponent', () => {
  let component: FollowerViewComponent;
  let fixture: ComponentFixture<FollowerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
