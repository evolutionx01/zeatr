import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cokkies',
  templateUrl: './cokkies.component.html',
  styleUrls: ['./cokkies.component.scss']
})
export class CokkiesComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  public allow(){
    localStorage.setItem('cookies', 'allow')
    this.activeModal.close('yes')
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

}
