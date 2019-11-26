import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistViewComponent } from './artist-view/artist-view.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistListComponent
  },
  {
    path: ':artist_id',
    component: ArtistViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
