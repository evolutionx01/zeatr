import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsViewComponent } from './events-view/events-view.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { FacebookModule } from 'ngx-facebook';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { BarRatingModule } from 'ngx-bar-rating';



@NgModule({
  declarations: [
    EventsViewComponent, 
    EventsListComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FacebookModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    OrderModule,
    ShareButtonsModule,
    BarRatingModule  
  ],
  entryComponents: []
})
export class EventsModule { }
