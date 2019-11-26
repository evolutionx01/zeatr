import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.scss']
})
export class PromptModalComponent implements OnInit {
  @Input() bindContentType ;

  title: string;
  content: string;
  value: string;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
      this.title = 'Confirmation';
    if(this.bindContentType == 'Delete'){
      this.content = 'Are you sure, you want to delete ?';
      this.value = 'Delete';
    }else if(this.bindContentType == 'Cancel' ){
      this.content = '<p>Tickets already been sold. If you want, you can cancel Event. Do you want to cancel ?'
      this.value = 'Ok';
    }else if(this.bindContentType == 'Other'){
      this.content = 'You are redirecting out of <em>ZEATR</em>. Are you sure, you want to redirect ?'
      this.value = 'Redirect';
    }
  }

  actionClicked(data: any) {
    this.activeModal.close(data)
  }

}
