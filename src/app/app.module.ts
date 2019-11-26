import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { ContentComponent } from './shared/layout/content/content.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './container/login/signin/signin.component';
import { RegisterComponent } from './container/login/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TagInputModule } from 'ngx-chips';
import { BenifitsComponent } from './container/benifits/benifits.component';
import { AuthGuard } from './container/auth/auth-guard/auth-guard';
import { AuthService } from './container/auth/auth-guard/auth.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LightboxModule } from 'ngx-lightbox';

import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { TermsandconditionsModalComponent } from './shared/layout/termsandconditions-modal/termsandconditions-modal.component';
import { BuyticketComponent } from './container/buyticket/buyticket.component';
import { NumberPickerModule } from 'ng-number-picker';
import { ForgetPasswordComponent } from './container/login/forget-password/forget-password.component';
import { ChatService } from './container/chat-view/services/chat.service';
import { PusherService } from './container/chat-view/services/pusher.service';
import { MyDetailsComponent } from './container/chat-view/my-details/my-details.component';
import { ChatComponent } from './container/chat-view/chat/chat.component';
import { ContactusmodalComponent } from './shared/layout/contactusmodal/contactusmodal.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PromptModalComponent } from './container/myaccount/prompt-modal/prompt-modal.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AddVenueModalComponent } from './container/create-event/add-venue-modal/add-venue-modal.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';
import { AdminloginComponent } from './container/admin/login/adminlogin.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { BarRatingModule } from "ngx-bar-rating";
import { AddReviewComponent } from './container/login/add-review/add-review.component';

fontLibrary.add(
  faCalendar,
  faClock
);

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('304147188929-cr2fqutds01i690pj13sr79lbvipi8ff.apps.googleusercontent.com')
   
    // provider: new GoogleLoginProvider('55081043607-87m8suunfadcj37qaa9u0rpfn8r82c2o.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('420372895427875')
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AddReviewComponent,
    SigninComponent,
    RegisterComponent,
    BenifitsComponent,

    TermsandconditionsModalComponent,
    BuyticketComponent,
    ForgetPasswordComponent,
    MyDetailsComponent,
    ChatComponent,
    PromptModalComponent,
    ContactusmodalComponent,  
    AddVenueModalComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    TagInputModule,
    CarouselModule,
    NgxDatatableModule,
    LightboxModule,
    SocialLoginModule,
    NumberPickerModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApQlzrasqmbQF3YoJDzm0ESwAT869J2bA',
      libraries: ["places"]
    }),
    BarRatingModule,
    // OwlDateTimeModule, 
    // OwlNativeDateTimeModeule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    RichTextEditorAllModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard,
    AuthService,
    ChatService,
    PusherService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [SigninComponent, RegisterComponent, AddReviewComponent, TermsandconditionsModalComponent, BuyticketComponent, ForgetPasswordComponent, ChatComponent, ContactusmodalComponent, PromptModalComponent,AddVenueModalComponent,AdminloginComponent]

})
export class AppModule { }
