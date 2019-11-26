import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewModalComponent } from './video-view-modal.component';

describe('VideoViewModalComponent', () => {
  let component: VideoViewModalComponent;
  let fixture: ComponentFixture<VideoViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
