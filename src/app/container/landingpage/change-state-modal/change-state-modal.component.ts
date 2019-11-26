import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-change-state-modal',
  templateUrl: './change-state-modal.component.html',
  styleUrls: ['./change-state-modal.component.scss']
})
export class ChangeStateModalComponent implements OnInit {
  public disabled: boolean

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public selectedState: any

  @Input() benifitType;

  public myGroup: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.disabled = true;
    this.buildSearch()

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
        types: ['(cities)']
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
          this.disabled = false;
          this.selectedState = place.address_components[0].long_name
         // this.venueForm.patchValue({name: place.formatted_address})
          this.zoom = 12;
        });
      });
    });
  }

  public buildSearch(){
    this.myGroup = this.formBuilder.group({
      state: new FormControl("", [Validators.required]),
    })
  }

  confirm() {
    let params ={
      lat: this.latitude,
      long: this.longitude,
      city: this.selectedState,
      status: 'yes'
    }
    this.activeModal.close(params)
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
