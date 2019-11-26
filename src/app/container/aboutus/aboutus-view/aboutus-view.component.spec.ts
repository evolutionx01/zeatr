import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusViewComponent } from './aboutus-view.component';

describe('AboutusViewComponent', () => {
  let component: AboutusViewComponent;
  let fixture: ComponentFixture<AboutusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
