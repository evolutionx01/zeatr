import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/layout/header/header.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public pForm: FormGroup
  showUserDetails: boolean;
  private passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'
  userName: string;
  constructor(
    // public activeModal: NgbActiveModal,
    public formbuilder: FormBuilder,
    private service: ChangePasswordService,
    private spinner: NgxSpinnerService,
    private notiService: ToasterNotiService,
    private router: Router,
    private headerservice : HeaderService
  ) { }

  ngOnInit() {
    this.buildform() 
  }

  public buildform() {
    this.pForm = this.formbuilder.group({
      password: new FormControl('', [Validators.required]),
      npassword: new FormControl('', [Validators.required,Validators.pattern(this.passwordPattern)]),
      cpassword: new FormControl('', [Validators.required,Validators.pattern(this.passwordPattern)]),
    }, {
        validator: this.passwordConfirming
      });

  }

  public passwordConfirming(c: AbstractControl): any {
    if (c.get('npassword').value !== c.get('cpassword').value) {
      c.get('cpassword').setErrors({ matchPassword: true });
    }
  }

  changePassword() {
    if (this.pForm.value.password !== this.pForm.value.npassword) {
    this.spinner.show()
    let dataParams = {
      oldPwd: this.pForm.value.password,
      newPwd: this.pForm.value.npassword
    }

    this.service.getChangePassword(dataParams).subscribe(
      data => {
        this.ChangePasswordDetails(data);
      }
    )
    }else{
      this.notiService.showError('Current Password and New Password Should not be Same.', '', 4000)
    }
  }

  private ChangePasswordDetails(data) {
    this.spinner.hide()
    if (data.success) {
      this.notiService.showSuccess(data.message, '', 4000)
      // this.logout();
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

  public clear(){
    this.pForm.reset();
    this.router.navigate(['myaccount']);
  }

  public logout() {
    this.headerservice.getLogoutDetails().subscribe(data => {
      this.logoutUserDetails(data)
    })
  }

  private logoutUserDetails(data) {
    if (data.success) {
      sessionStorage.clear();
      this.router.navigate(['']);
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }
}
