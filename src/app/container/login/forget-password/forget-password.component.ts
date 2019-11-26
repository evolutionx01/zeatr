import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgetPasswordService } from './forget-password.service';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public modalOption: NgbModalOptions = {};
  public resetForm: FormGroup;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    public activeModal: NgbActiveModal,
    public formbuilder: FormBuilder,
    public service: ForgetPasswordService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.buildResetPassword()
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

  public buildResetPassword() {
    this.resetForm = this.formbuilder.group({
      resetEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    });
  }

  public sendEmail() {
    this.spinner.show()
    let dataparams = {
      email: this.resetForm.value.resetEmail,
    }
    this.service.forgetPassword(dataparams).subscribe(
      data => {
        this.forgetPasswordDetails(data)

      }
    )

  }

  private forgetPasswordDetails(data) {
    this.spinner.hide()
    if (data.success) {
      this.notiService.showSuccess(data.message, '', 4000)
      this.activeModal.close('yes')
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

}
