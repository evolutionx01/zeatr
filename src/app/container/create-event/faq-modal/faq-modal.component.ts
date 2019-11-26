import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq-modal',
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss']
})
export class FaqModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {  }

  ngOnInit() {
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

}
