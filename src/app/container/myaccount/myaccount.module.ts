 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountViewComponent } from './myaccount-view/myaccount-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyaccountRoutingModule } from './myaccount-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { UploadComponent } from './upload/upload.component';
import { LightboxModule } from 'ngx-lightbox';
// import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { VideoViewModalComponent } from './video-view-modal/video-view-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UiSwitchModule } from 'ngx-toggle-switch'
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FollowerViewComponent } from './follower-view/follower-view.component';
import { FollowingViewComponent } from './following-view/following-view.component';
import { ServiceComponent } from './service/service.component';
import { EventfollowersComponent } from './eventfollowers/eventfollowers.component';
import { OrderModule } from 'ngx-order-pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({

  declarations: [MyaccountViewComponent, UploadComponent, VideoViewModalComponent, ChangePasswordComponent, FollowerViewComponent, FollowingViewComponent, ServiceComponent, EventfollowersComponent],

  imports: [
    CommonModule,
    MyaccountRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    LightboxModule,
    RichTextEditorAllModule,
    NgSelectModule,
    UiSwitchModule,
    ShareButtonsModule,
    OrderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],

  entryComponents: [UploadComponent, VideoViewModalComponent,ServiceComponent]

})
export class MyaccountModule { }
