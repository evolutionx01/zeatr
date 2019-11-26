import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/app/shared/layout/header/header.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public pForm: FormGroup
  showUserDetails: boolean;
  private passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'
  userName: string;
  constructor(
    // public activeModal: NgbActiveModal,
    public formbuilder: FormBuilder,
    private service: ResetPasswordService,
    private spinner: NgxSpinnerService,
    private notiService: ToasterNotiService,
    private router: Router,
    private headerservice: HeaderService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildform()
    // if (Object.entries(this.activeRoute.snapshot.queryParams).length != 0) {
    //   this.changePassword(this.activeRoute.snapshot.queryParams)
    // }
  
  }


  public buildform() {
    this.pForm = this.formbuilder.group({
      npassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      cpassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
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

    this.spinner.show()
    console.log(this.pForm);

    let dataParams = {
      newPwd: this.pForm.value.npassword,
      email: this.activeRoute.snapshot.queryParams.mail,
      code: this.activeRoute.snapshot.queryParams.code
    }

    this.service.updatePassword(dataParams).subscribe(
      data => {
        this.ChangePasswordDetails(data);
      }
    )
  }

  private ChangePasswordDetails(data) {
    this.spinner.hide()
    if (data.success) {
      this.notiService.showSuccess(data.message, '', 4000)
      this.router.navigate(['/']);

    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

  public clear() {
    this.pForm.reset();
  }
}
