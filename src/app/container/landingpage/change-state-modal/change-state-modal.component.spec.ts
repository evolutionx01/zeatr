import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateModalComponent } from './change-state-modal.component';

describe('ChangeStateModalComponent', () => {
  let component: ChangeStateModalComponent;
  let fixture: ComponentFixture<ChangeStateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
