import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { UpcomingEventsService } from "./upcoming-events.service";
import {
  NgbCarouselConfig,
  NgbModalOptions,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { BuyticketComponent } from "../../buyticket/buyticket.component";
import { SigninComponent } from "../../login/signin/signin.component";
import { PromptModalComponent } from "../../myaccount/prompt-modal/prompt-modal.component";
import { OrderPipe } from "ngx-order-pipe";

@Component({
  selector: "app-upcoming-events",
  templateUrl: "./upcoming-events.component.html",
  styleUrls: ["./upcoming-events.component.scss"],
  providers: [DatePipe, NgbCarouselConfig]
})
export class UpcomingEventsComponent implements OnInit {
  public modalOption: NgbModalOptions = {};

  public category: any;
  public lat: any;
  public lng: any;

  public showCarousel: boolean;
  public selectedCity: any;

  public upcomingEventsData: any;
  order: string = "fromDate";
  ticketData: any;

  constructor(
    private upcomingEventsService: UpcomingEventsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.getCategory();
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    if (sessionStorage.getItem("currentCity")) {
      this.selectedCity = sessionStorage.getItem("currentCity");
      this.upcomingEvents(
        sessionStorage.getItem("lat"),
        sessionStorage.getItem("lng")
      );
    } else {
      this.getCurrentLocation();
    }
    // this.testUpcomingEvents();
  }

  public getCategory() {
    this.upcomingEventsService.getcategories().subscribe(data => {
      console.log(data);
      this.category = data;
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
            sessionStorage.setItem("lat", this.lat);
            sessionStorage.setItem("lng", this.lng);

            this.upcomingEvents(this.lat, this.lng);
            // this.selectedCity = this.getCity(this.lat,this.lng)
          }
        },
        (error: PositionError) => console.log(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public testUpcomingEvents() {
    this.spinner.show();
    this.upcomingEventsService.gettestUpcomingEvents().subscribe(data => {
      console.log(data);
      this.upcomingEventsDetails(data);
    });
  }

  public upcomingEvents(lat, long) {
    this.spinner.show();
    let dataParams = {
      lat: lat,
      lng: long
    };
    this.upcomingEventsService.getUpcomingEvents(dataParams).subscribe(
      data => {
        console.log(data);
        this.upcomingEventsDetails(data);
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  private upcomingEventsDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.showCarousel = data.details.length > 4 ? true : false;
      data.details.map(item => {
        console.log(item["fromDate"]);
        console.log(item);
        item["fromDate"] = new Date(item["fromDate"]);
        item["endDate"] = new Date(item["endDate"]);
      });
      console.log(data.details);
      data.details.forEach(element => {
        element.availableTickets = 0;
        if (
          element.eventSource == 'EB'
        ) {
          console.log("event brite")
          element["hasTickets"] = true;
          element.availableTickets = 1;
        }
        else if (element.eventTickets !== null && element.eventTickets.length !== 0) {
          console.log("has tickets")
          element["hasTickets"] = true;
          element.eventTickets.forEach(ele => {
            element.availableTickets = element.availableTickets + ele.available;
          });
        } else {
          console.log("no tickets")
          element["hasTickets"] = false;
        }
      });
      this.selectedCity = sessionStorage.getItem("currentCity");
      this.upcomingEventsData = this.orderPipe.transform(
        data.details,
        this.order
      );
    }
  }

  public eventListingPage() {
    localStorage.setItem("fromDate", null);
    localStorage.setItem("endDate", null);
    this.router.navigate(["events"]);
  }

  public eventDetailsPage(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["events", id]);
  }

  upcomingEventOption: any = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<span><i class='fas fa-chevron-circle-left'></i> Previous</span>",
      "<span>Next <i class='fas fa-chevron-circle-right'></i></span>"
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  public buyTickets(data) {
    this.ticketData = data;
    console.log(data);
    if (sessionStorage.getItem("ID") !== null) {
      console.log(data);
      if (
        data.eventTickets == null ||
        data.eventTickets == "" ||
        data.eventTickets == undefined
      ) {
        let confRef = this.modalService.open(
          PromptModalComponent,
          this.modalOption
        );
        confRef.componentInstance.bindContentType = "Other";
        confRef.result
          .then(result => {
            if (result == "Yes") {
              window.open(data.slug, "_blank");
            } else {
              return;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let dataParams = {
          data: data
        };

        const confRef = this.modalService.open(
          BuyticketComponent,
          this.modalOption
        );
        confRef.componentInstance.ticketsDetails = dataParams;

        confRef.result
          .then(result => {
            console.log(result);
            if (result == "yes") {
              this.getCurrentLocation();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      let dataParams = {};

      const confRef = this.modalService.open(SigninComponent, this.modalOption);
      confRef.componentInstance.dataStatus = dataParams;

      confRef.result
        .then(result => {
          console.log(result);
          if (result == "yes") {
            this.buyTickets(this.ticketData);
          } else if (result == "no") {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  public getListofCategoryEvents(event) {
    this.spinner.show();
    console.log(event.id);
    this.upcomingEventsService.getCategoryEvents(event.id).subscribe(data => {
      console.log(data);
      this.upcomingEventsDetails(data);
    });
  }

  // public getCity(lat,lng){

  //   var latlng = new google.maps.LatLng(lat, lng);
  //   var geocoder = geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //           if (results[1]) {
  //              this.city =  results[5].address_components[0].long_name
  //           }
  //       }
  //   });

  //   console.log(this.city)
  // }
}
