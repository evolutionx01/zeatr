import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingpageViewComponent } from './landingpage-view/landingpage-view.component';
import { BenifitsModalComponent } from './benifits-modal/benifits-modal.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { FeaturedArtistComponent } from './featured-artist/featured-artist.component';
// import { NgxHmCarouselModule } from 'ngx-hm-carousel/public_api';
// import { NgxHmCarouselModule } from 'ngx-hm-carousel/lib/ngx-hm-carousel.module';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CokkiesComponent } from './cokkies/cokkies.component';
import { ChangeStateModalComponent } from './change-state-modal/change-state-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { OrderModule } from 'ngx-order-pipe';





@NgModule({
  declarations: [
    LandingpageViewComponent, 
    BenifitsModalComponent, 
    UpcomingEventsComponent, 
    FeaturedArtistComponent, CokkiesComponent, ChangeStateModalComponent, 
  ],
  imports: [
    OrderModule,
    CommonModule,
    LandingpageRoutingModule,
    NgSelectModule,
    NgbModule,
    AutocompleteLibModule,
    NgxHmCarouselModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApQlzrasqmbQF3YoJDzm0ESwAT869J2bA',
      libraries: ["places"]
    })
  ],
  entryComponents: [BenifitsModalComponent,CokkiesComponent,ChangeStateModalComponent]
})
export class LandingpageModule { }
