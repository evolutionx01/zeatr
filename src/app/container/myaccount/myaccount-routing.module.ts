import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyaccountViewComponent } from './myaccount-view/myaccount-view.component';
import { AuthGuard } from '../auth/auth-guard/auth-guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FollowerViewComponent } from './follower-view/follower-view.component';
import { FollowingViewComponent } from './following-view/following-view.component';
import { EventfollowersComponent } from './eventfollowers/eventfollowers.component';


const routes: Routes = [
  {
    path:'',
    component:MyaccountViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'change',
    component:ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'followers',
    component:FollowerViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'following',
    component:FollowingViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'eventfollowers/:id',
    component:EventfollowersComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
