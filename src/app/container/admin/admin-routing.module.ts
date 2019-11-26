import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminlandingpageComponent } from './adminlandingpage/adminlandingpage.component';
import { AuthGuard } from '../auth/auth-guard/auth-guard';
const routes: Routes = [
  {
    path:'',
    component: AdminlandingpageComponent,
    // canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],


})
export class AdminRoutingModule { }
