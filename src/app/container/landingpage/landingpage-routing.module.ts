import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageViewComponent } from './landingpage-view/landingpage-view.component';

const routes: Routes = [
  {
    path:'',
    component:LandingpageViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingpageRoutingModule { }
