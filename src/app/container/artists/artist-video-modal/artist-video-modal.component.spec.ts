import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistVideoModalComponent } from './artist-video-modal.component';

describe('ArtistVideoModalComponent', () => {
  let component: ArtistVideoModalComponent;
  let fixture: ComponentFixture<ArtistVideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistVideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
