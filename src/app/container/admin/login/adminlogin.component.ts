import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { ForgetPasswordComponent } from '../../login/forget-password/forget-password.component';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  public modalOption: NgbModalOptions = {};
  signinadmin: FormGroup;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private adminService : AdminService,
    private router:Router,
    private notiService:ToasterNotiService,
    private modalService: NgbModal) {    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
  }

  ngOnInit() {
    this.buildSignInForm();
  }
  public buildSignInForm() {
    this.signinadmin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required])
    })
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

  login(){
    let data = {
      email : this.signinadmin.controls['email'].value,
      password : this.signinadmin.controls['password'].value
    }
    // this.adminService.login(data).subscribe(res=>{
      if (true) {
        sessionStorage.setItem('admin', 'true');
        // sessionStorage.setItem('token', 'data.details.token');
        // sessionStorage.setItem('ID', 'data.details.user.id');
        sessionStorage.setItem('emailId', 'data.details.user.email');
        sessionStorage.setItem('name', 'ADMINISTATOR');
        // sessionStorage.setItem('role', 'data.details.user.birthPlace');
        this.notiService.showSuccess('data.message', '', 4000);
        this.activeModal.close('yes')
        // this.router.navigate(['/']);
      } else {
        this.notiService.showError('data.message', '', 4000)
      }
      this.router.navigate(['admin']);
      this.activeModal.close('Yes')
    // })
  }

  public forgetPassword(){
    this.activeModal.close('yes')

    const confRef = this.modalService.open(ForgetPasswordComponent, this.modalOption);
    // confRef.componentInstance.uploadType = dataParams;

    confRef.result.then((result) => {
      if (result == 'yes') {

      } else if (result == 'no') {

      }
    }).catch((error) => {
    });
  }
}
