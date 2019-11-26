import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminlandingpageComponent } from "../admin/adminlandingpage/adminlandingpage.component";
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';

@NgModule({
  declarations: [AdminlandingpageComponent, AdminSidenavComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
