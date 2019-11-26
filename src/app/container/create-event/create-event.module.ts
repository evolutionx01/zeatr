import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateEventRoutingModule } from './create-event-routing.module';
import { AddEventComponent } from './add-event/add-event.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { DateTimePickerComponent } from 'src/app/shared/services/date-time-picker/date-time-picker.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FaqModalComponent } from './faq-modal/faq-modal.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';


export const MY_MOMENT_FORMATS = {
  fullPickerInput: 'dd, L, LT',
  datePickerInput: 'dd, L, LT',
  monthYearLabel: 'MMMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [AddEventComponent, AddEventModalComponent, DateTimePickerComponent, FaqModalComponent, GoogleMapComponent],
  imports: [
    CommonModule,
    CreateEventRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    RichTextEditorAllModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApQlzrasqmbQF3YoJDzm0ESwAT869J2bA',
      libraries: ["places"]
    })

  ],
  exports: [ GoogleMapComponent ],
  entryComponents: [AddEventModalComponent, FaqModalComponent]
})
export class CreateEventModule { }
