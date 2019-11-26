import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistViewComponent } from './artist-view/artist-view.component';
import { ArtistsRoutingModule } from './artists-routing.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ArtistVideoModalComponent } from './artist-video-modal/artist-video-modal.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistViewComponent,
    ArtistVideoModalComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    DragScrollModule,
    CarouselModule,
    NgbModule,
    LightboxModule,
    ShareButtonsModule,
    OrderModule
  ],
  entryComponents: [ArtistVideoModalComponent]
})
export class ArtistsModule { }
