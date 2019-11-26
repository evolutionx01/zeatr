import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusmodalComponent } from './contactusmodal.component';

describe('ContactusmodalComponent', () => {
  let component: ContactusmodalComponent;
  let fixture: ComponentFixture<ContactusmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
