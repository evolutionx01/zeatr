import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';

@NgModule({
  declarations: [AdminLoginComponent, AdminComponent, AdminSidenavComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
