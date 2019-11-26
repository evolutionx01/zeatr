import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {  TermsandconditionsModalComponent} from '../termsandconditions-modal/termsandconditions-modal.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ContactusmodalComponent} from '../contactusmodal/contactusmodal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public modalOption: NgbModalOptions = {};
  Router: any;
  constructor(
    private modalService: NgbModal,
private router:Router,
    ) { }

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
  }

  openTermsandConditions(params){
    const confRef = this.modalService.open(TermsandconditionsModalComponent, this.modalOption);
    confRef.componentInstance.Type = params;
  }
  openContactUs(params){
    const confRef = this.modalService.open(ContactusmodalComponent, this.modalOption);
    confRef.componentInstance.Type = params;
  }
  navigateToAboutUs(){
     this.router.navigate(['aboutus']);
     
  }
}
