import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsViewComponent } from './events-view/events-view.component';


const routes: Routes = [
  {
    path: '',
    component: EventsListComponent
  },
  {
    path: ':event_id',
    component: EventsViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
