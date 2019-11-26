import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artist-video-modal',
  templateUrl: './artist-video-modal.component.html',
  styleUrls: ['./artist-video-modal.component.scss']
})
export class ArtistVideoModalComponent implements OnInit {

  @Input() videoData: any;
  url: string;
  // public activeModal: NgbActiveModal

  constructor(public sanitizer: DomSanitizer,public activeModal: NgbActiveModal) { 

   }

  ngOnInit() {
    this.url=this.videoData.data.location;
  
  }
  actionClicked(data) {
    this.activeModal.close(data)
  }

}
