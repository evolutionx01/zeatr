import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-view-modal',
  templateUrl: './video-view-modal.component.html',
  styleUrls: ['./video-view-modal.component.scss']
})
export class VideoViewModalComponent implements OnInit {
  @Input() videoData: any;
  url: string;
  public isYoutube: boolean;
  // public activeModal: NgbActiveModal

  constructor(public sanitizer: DomSanitizer, public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    console.log(this.videoData.data.type)
    this.isYoutube = this.videoData.data.type == 'LINK' ? true : false;
    console.log(this.videoData.data.location);
    this.url = this.videoData.data.location;

  }
  actionClicked(data) {
    this.activeModal.close(data)
  }

}
