import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconditionsModalComponent } from './termsandconditions-modal.component';

describe('TermsandconditionsModalComponent', () => {
  let component: TermsandconditionsModalComponent;
  let fixture: ComponentFixture<TermsandconditionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandconditionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandconditionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
