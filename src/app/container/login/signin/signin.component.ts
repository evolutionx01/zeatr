import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SigninService } from './signin.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToasterNotiService } from '../../../shared/services/notification/toaster-noti.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../shared/common/common.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  
  public modalOption: NgbModalOptions = {};

  private user: SocialUser;
  private loggedIn: boolean;

  public signin: FormGroup;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'

  constructor(
    public activeModal: NgbActiveModal,
    private service: SigninService,
    private formBuilder: FormBuilder,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router : Router
  ) { 
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
  }

  ngOnInit() {
    this.buildSignInForm();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public buildSignInForm() {
    this.signin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      // password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      password: new FormControl('', [Validators.required])
    })
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

  public login() {
    this.spinner.show()

    let dataParams = {
      username: this.signin.value.email,
      password: this.signin.value.password,
      provider: "zeatr"
    }

    this.service.getLoginDetails(dataParams).subscribe(
      data => {
        this.siginDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
        this.activeModal.close('yes')
      }
    )
  }

  private siginDetails(data) {
    this.spinner.hide()
    if (data.success) {
      sessionStorage.setItem('provider', data.details.user.provider);
      sessionStorage.setItem('token', data.details.token);
      sessionStorage.setItem('ID', data.details.user.id);
      sessionStorage.setItem('emailId', data.details.user.email);
      sessionStorage.setItem('name', data.details.user.firstName + ' '+ data.details.user.lastName);
      sessionStorage.setItem('role', data.details.user.birthPlace);
      this.notiService.showSuccess(data.message, '', 4000)
      this.commonService.loggedIn(true)
      this.activeModal.close('yes')
      // this.router.navigate(['/']);
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

  public test() {
    console.log('tetsy')
  }


  signInWithGoogle(): void {
    // this.spinner.show()
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      x => {
        this.signInWithGoogleData(x)
      }
    );
  }

  public signInWithGoogleData(data) {
    let dataParams = {
      username: data.email,
      password: '',
      provider: "google"
    }

    this.service.getLoginDetails(dataParams).subscribe(
      data => {
        this.siginDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
        this.activeModal.close('yes')
      }
    )
  }

  signInWithFB(): void {
    // this.spinner.show()
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      x => {
        this.signInWithFacebookData(x)
      }
    );
  }

  public signInWithFacebookData(data){
    let dataParams = {
      username: data.email,
      password: '',
      provider: "facebook"
    }

    this.service.getLoginDetails(dataParams).subscribe(
      data => {
        this.siginDetails(data)
      },
      error => {
        this.spinner.hide()
        this.notiService.showError(error.message, '', 4000)
        this.activeModal.close('yes')
      }
    )
  }

  signOut(): void {
    this.authService.signOut();
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
      console.log(error);
    });
  }

}
