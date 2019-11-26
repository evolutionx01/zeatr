import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageViewComponent } from './landingpage-view.component';

describe('LandingpageViewComponent', () => {
  let component: LandingpageViewComponent;
  let fixture: ComponentFixture<LandingpageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
