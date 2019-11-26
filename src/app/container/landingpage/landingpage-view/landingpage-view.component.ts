import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgbModalOptions, NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LandingpageViewService } from './landingpage-view.service';
import { environment } from '../../../../environments/environment';
import { BenifitsModalComponent } from '../benifits-modal/benifits-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CokkiesComponent } from '../cokkies/cokkies.component';
import { ChangeStateModalComponent } from '../change-state-modal/change-state-modal.component';
import { UpcomingEventsComponent } from '../upcoming-events/upcoming-events.component';
import { MapsAPILoader } from '@agm/core';
import { GeocodingService } from './geodecode.service';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';

@Component({
  selector: 'app-landingpage-view',
  templateUrl: './landingpage-view.component.html',
  styleUrls: ['./landingpage-view.component.scss'],
  providers: [DatePipe, NgbCarouselConfig, GeocodingService]
})
export class LandingpageViewComponent implements OnInit {

  @ViewChild(UpcomingEventsComponent) child: UpcomingEventsComponent;

  public geocoder: any;
  public selectedCity: any;


  public modalOption: NgbModalOptions = {};
  public date: any;
  public firstDayOfTheWeek: any;
  public lastDayOfTheWeek: any;

  public keyword: any

  public monthStart: any;
  public monthEnd: any;

  public firstDayOfNextTheWeek: any;
  public lastDayOfNextTheWeek: any;

  public searchdata: any;
  public seachSelectedType: any;

  public showEvent: boolean;
  public searchSelectItem: any;

  public lat: any;
  public lng: any;



  public currentSearchType: string = 'Artist';
  public searchType: any = [
    { value: 'Artist' },
    { value: 'Event' }
  ]

  public ipAddress: any;


  constructor(
    private landingPageService: LandingpageViewService,
    private modalService: NgbModal,
    private router: Router,
    private datePipe: DatePipe,
    private config: NgbCarouselConfig,
    private el: ElementRef,
    private geocodingService: GeocodingService,
    private notiService: ToasterNotiService,
    private activeRoute: ActivatedRoute
  ) {
    config.interval = 1000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  ngAfterViewInit() {
    let showPop = localStorage.getItem('cookies')
    if (showPop != 'allow') {
      this.preference()
    }

  }

  ngOnInit() {

    if (Object.entries(this.activeRoute.snapshot.queryParams).length != 0) {
      this.verifyRegister(this.activeRoute.snapshot.queryParams)
    }

    if (sessionStorage.getItem('currentCity')) {
      this.selectedCity = sessionStorage.getItem('currentCity')
    } else {
      this.getCurrentLocation()
    }

    this.getIp()
    this.seachSelectedType = this.currentSearchType;
    this.keyword = 'firstName';
    this.showEvent = false;
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.getDateDetails();
  }

  public verifyRegister(params) {
    this.landingPageService.verifyMail(params).subscribe(
      data => {
        console.log(data)
        this.verifyDetails(data)
      }
    )
  }

  private verifyDetails(data) {
    if (data.success) {
      this.router.navigate(['/']);
      this.notiService.showSuccess(data.message, "", 4000);
    } else {
      this.notiService.showError(data.message, "", 4000);
    }
  }

  public preference() {
    // event.stopPropagation();
    const confRef = this.modalService.open(CokkiesComponent, this.modalOption);
    confRef.result.then((result) => {
      console.log(result)
      if (result == 'yes') {

      } else if (result == 'no') {

      }
    }).catch((error) => {
      console.log(error);
    });

  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          if (position) {
            console.log(
              "Latitude: " +
              position.coords.latitude +
              "Longitude: " +
              position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            var latlng = new google.maps.LatLng(this.lat, this.lng);

            this.geocodingService.geocode(latlng).subscribe(data => {
              this.getCity(data)
            })
          }
        },
        (error: PositionError) => console.log(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private getCity(data) {
    data.map(item => {
      if (item.types[0] == "locality") {
        this.selectedCity = item.address_components[0].long_name
        sessionStorage.setItem('currentCity', this.selectedCity)
      }
    })
  }


  public getIp() {
    this.landingPageService.getIpAddress().subscribe(
      data => {
        this.ipAddress = data['ip'];
        console.log(this.ipAddress)
      }
    )
  }

  public getDateDetails() {

    let today = new Date();

    let startOfWeek = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
    let endOfWeek = startOfWeek + 6

    this.firstDayOfTheWeek = this.datePipe.transform(new Date(today.setDate(startOfWeek)), 'EEE, MMMM dd, y');
    this.lastDayOfTheWeek = this.datePipe.transform(new Date(today.setDate(endOfWeek)), 'EEE, MMMM dd, y');

    let startOfNextWeek = new Date(this.lastDayOfTheWeek).getDate() + 1
    let endOfNextWeek = startOfNextWeek + 6

    this.firstDayOfNextTheWeek = this.datePipe.transform(new Date(today.setDate(startOfNextWeek)), 'EEE, MMMM dd, y');
    this.lastDayOfNextTheWeek = this.datePipe.transform(new Date(today.setDate(endOfNextWeek)), 'EEE, MMMM dd, y');

    let newToday = new Date()
    this.monthStart = this.datePipe.transform(new Date(newToday.getFullYear(), newToday.getMonth(), 1), 'EEE, MMMM dd, y');
    this.monthEnd = this.datePipe.transform(new Date(newToday.getFullYear(), newToday.getMonth() + 1, 0), 'EEE, MMMM dd, y');

  }


  public benifits(type) {

    let dataParams = {
      type: type
    }

    const confRef = this.modalService.open(BenifitsModalComponent, this.modalOption);
    confRef.componentInstance.benifitType = dataParams;

    confRef.result.then((result) => {
      console.log(result)
      if (result == 'yes') {

      } else if (result == 'no') {

      }
    }).catch((error) => {
      console.log(error);
    });

  }

  selectEvent(item) {
    console.log(item)
    this.searchSelectItem = item
  }

  onChangeSearch(search: string) {
    console.log(search)
    if (this.seachSelectedType == 'Artist') {
      this.landingPageService.getSearchResultArtist(search).subscribe(
        data => {
          console.log(data)

          this.searchdata = data
        }
      )
    } else {
      this.landingPageService.getSearchResultEvent(search).subscribe(
        data => {
          console.log(data)
          this.searchdata = data
        }
      )
    }

  }

  onFocused(e) {
    console.log(e)
    // do something
  }

  onClear() {
    console.log('clear')

    this.searchSelectItem = ''
  }

  public onTypeChange(type) {
    console.log(type)
    this.searchSelectItem = '';
    this.seachSelectedType = type;
    this.searchdata = []

    if (type == 'Artist') {
      this.showEvent = false;
      this.keyword = 'firstName';
    } else {
      this.showEvent = true;
      this.keyword = 'name';
    }
  }

  public searchRedirect() {

    if (this.searchSelectItem) {
      if (this.seachSelectedType == 'Artist') {
        this.router.navigate(['artists', this.searchSelectItem.id]);
      } else {
        this.router.navigate(['events', this.searchSelectItem.id]);
      }
    }
  }

  public quickSearch(start, end) {
    start = new Date(start)
    end = new Date(end)
    localStorage.setItem('fromDate', start)
    localStorage.setItem('endDate', end)
    this.router.navigate(['events']);

  }

  public change_state() {
    let dataParams = {
      type: 'state'
    }

    const confRef = this.modalService.open(ChangeStateModalComponent, this.modalOption);
    confRef.componentInstance.benifitType = dataParams;

    confRef.result.then((result) => {


      if (result.status == 'yes') {
        console.log(result)
        this.selectedCity = result.city
        sessionStorage.setItem('currentCity', result.city)
        sessionStorage.setItem('lat', result.lat)
        sessionStorage.setItem('lng', result.long)
        this.child.upcomingEvents(result.lat, result.long)

      } else {

      }
    }).catch((error) => {
      console.log(error);
    });
  }



}
