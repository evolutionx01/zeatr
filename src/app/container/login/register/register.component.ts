import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from './register.service';

import { ToasterNotiService } from '../../../shared/services/notification/toaster-noti.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  public signup: FormGroup;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildLoginForm();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }


  public register() {
    this.spinner.show()

    let dataParams = {
      email: this.signup.value.email,
      firstName: this.signup.value.firstname,
      lastName: this.signup.value.lastname,
      password: this.signup.value.password,
      type: this.signup.value.role,
      provider: "zeatr",
      subscriber: "1"
    }
    this.service.getRegisterationDetails(dataParams).subscribe(
      data => {
        this.registrationDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
      }
    )
  }

  private registrationDetails(data) {
    this.spinner.hide()
    if (data.success) {
      this.notiService.showSuccess(data.message, '', 4000)
      this.activeModal.close('yes');

    } else {
      this.notiService.showError(data.message, '', 4000)
    }

  }

  // Validators.minLength(8)

  public buildLoginForm() {
    this.signup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirm_password: new FormControl('', [Validators.required]),
      role: new FormControl('1'),
      agreed: new FormControl(false, [Validators.required,])
    }, {
        validator: this.passwordConfirming

      });
  }

  public passwordConfirming(c: AbstractControl): any {
    if (c.get('password').value !== c.get('confirm_password').value) {
      c.get('confirm_password').setErrors({ matchPassword: true });
    }
  }

  registerWithGoogle(): void {
    // this.spinner.show()
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      x => {
        this.registerWithGoogleData(x)
      }
    );
  }

  public registerWithGoogleData(data) {
    let dataParams = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: '',
      type: this.signup.value.role,
      provider: "google",
      subscriber: "1"
    }

    this.service.getRegisterationDetails(dataParams).subscribe(
      data => {
        this.registrationDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
      }
    )

  }

  registerWithFB(): void {
    // this.spinner.show()
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      x => {
        this.registerWithFaceBookData(x)
      }

    );
  }

  public registerWithFaceBookData(data) {
    let dataParams = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: '',
      type: this.signup.value.role,
      provider: "facebook",
      subscriber: "1"
    }

    this.service.getRegisterationDetails(dataParams).subscribe(
      data => {
        this.registrationDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
      }
    )

  }

  signOut(): void {
    this.authService.signOut();
  }

}
