import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusViewComponent } from './aboutus-view/aboutus-view.component';

const routes: Routes = [
  {
    path: '',
    component: AboutusViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
