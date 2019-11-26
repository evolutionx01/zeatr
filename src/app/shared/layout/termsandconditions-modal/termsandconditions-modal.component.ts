import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-termsandconditions-modal',
  templateUrl: './termsandconditions-modal.component.html',
  styleUrls: ['./termsandconditions-modal.component.scss']
})
export class TermsandconditionsModalComponent implements OnInit {
  @Input() Type;
  title: string;
  data: any;
  showTerms: boolean;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.title = (this.Type == 'Terms') ? "Terms and Conditions" : "Privacy Policy";
    // this.data =  (this.Type == 'Terms')? 
    if (this.Type == 'Terms') {
      this.showTerms = true;
    } else {
      this.showTerms = false;
    }
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

}
