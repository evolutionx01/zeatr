/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, EventEmitter, Output, Input, NgZone, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { UploadService } from '../../myaccount/upload/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddEventService } from '../add-event/add-event.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-venue-modal',
  templateUrl: './add-venue-modal.component.html',
  styleUrls: ['./add-venue-modal.component.scss']
})
export class AddVenueModalComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @Input() setData: any;
  public value: string;

  venueForm: FormGroup;
  image: string | ArrayBuffer;
  public isCreated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private notiService: ToasterNotiService,
    public activeModal: NgbActiveModal,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService,
    private eventService: AddEventService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    this.buildForm();

    this.zoom = 10;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
  
    //create search FormControl
    this.searchControl = new FormControl();
  
    //set current position
    this.setCurrentPosition();
  
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.venueForm.patchValue({name: place.formatted_address})
          this.zoom = 12;
        });
      });
    });
    
    this.value = this.setData.value;
    if (this.setData.data !== null) {
      let tags = []
      this.setData.data.tags.map((item: any) => {
        let params = {
          display: '',
          value: ''
        }
        params.display = item;
        params.value = item;
        tags.push(params)
      });
      this.setData.data.tags = tags;
      this.venueForm.patchValue(this.setData.data);
      this.image = this.setData.data.picture;
    }
  }

  public buildForm() {
    this.venueForm = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'parkingCapacity': new FormControl('', Validators.required),
      'seatingCapacity': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'tags': new FormControl([], Validators.required),
    })
  }
  actionClicked(data) {
    this.activeModal.close(data)
  }

  saveVenue() {
    let attributes = [];
    this.venueForm.value.tags.map(item => {
      attributes.push(item['value'])
    });
    this.venueForm.value.tags = attributes;
    this.venueForm.value['picture'] = this.image;
    this.venueForm.value['url'] = this.router.url;
    this.activeModal.close(this.venueForm.value);
  }

  changeListener($event): void {
    this.readThis($event.target);

  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);

    let postParams = new FormData();
    postParams.append('file', file, file.name)
    this.spinner.show();
    this.uploadService.uploadImage(postParams).subscribe(
      data => {
        this.spinner.hide();
        this.image = data['details'].location;
      }, error => {
        this.spinner.hide();
        this.notiService.showError(error, '', 4000)
      }
    )

  }

  public isVenueExists() {
    let value = this.venueForm.controls['name'].value;
    // this.eventService.isVenueExists(value).subscribe(data=>{
    //   if(data == true){
    //     this.isCreated = true;
    //   }else{
    //     this.isCreated = false;
    //   }
    // })
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
