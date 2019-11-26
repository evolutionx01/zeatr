import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenifitsModalComponent } from './benifits-modal.component';

describe('BenifitsModalComponent', () => {
  let component: BenifitsModalComponent;
  let fixture: ComponentFixture<BenifitsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenifitsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenifitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
