import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: './container/landingpage/landingpage.module#LandingpageModule',
      },
      {
        path: 'events',
        loadChildren: './container/events/events.module#EventsModule',
      },
      {
        path: 'artists',
        loadChildren: './container/artists/artists.module#ArtistsModule',
      },
      {
        path: 'myaccount',
        loadChildren: './container/myaccount/myaccount.module#MyaccountModule',
      },
      {
        path: 'create_event',
        loadChildren: './container/create-event/create-event.module#CreateEventModule',
      },
      {
        path: 'aboutus',
        loadChildren: './container/aboutus/aboutus.module#AboutusModule',
      },
      {
        path: 'admin',
        loadChildren: './container/admin-panel/admin-panel.module#AdminPanelModule',
      },
      {
        path: 'reset',
        loadChildren: './container/reset/reset.module#ResetModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
