import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokkiesComponent } from './cokkies.component';

describe('CokkiesComponent', () => {
  let component: CokkiesComponent;
  let fixture: ComponentFixture<CokkiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokkiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokkiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
