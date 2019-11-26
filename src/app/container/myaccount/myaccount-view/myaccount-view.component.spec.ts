import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountViewComponent } from './myaccount-view.component';

describe('MyaccountViewComponent', () => {
  let component: MyaccountViewComponent;
  let fixture: ComponentFixture<MyaccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
