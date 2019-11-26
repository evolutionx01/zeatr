import { Component, OnInit, ViewChild } from "@angular/core";
import { EventsListService } from "./events-list.service";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModal,
  NgbModalOptions,
  NgbPaginationConfig
} from "@ng-bootstrap/ng-bootstrap";
import { BuyticketComponent } from "../../buyticket/buyticket.component";
import { SigninComponent } from "../../login/signin/signin.component";
import { ToasterNotiService } from "src/app/shared/services/notification/toaster-noti.service";
import { PromptModalComponent } from "../../myaccount/prompt-modal/prompt-modal.component";
import { OrderPipe } from "ngx-order-pipe";

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.scss"],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    NgbPaginationConfig
  ]
})
export class EventsListComponent implements OnInit {
  page: 1;
  public upcomingEventsData: any;
  public modalOption: NgbModalOptions = {};
  public list: boolean;
  public grid: boolean;
  public dateRangeForm: FormGroup;
  endDateObj: { year: number; month: number; day: number };
  @ViewChild("eventPagination") event_pagination: any;

  public totalCount: any;
  public pageLimit: any;
  order: string = "fromDate";
  ticketData: any;

  constructor(
    private eventsListService: EventsListService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notiService: ToasterNotiService,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.totalCount = 200;
    this.pageLimit = 20;
    this.buildDateForm();
    console.log(localStorage.getItem("fromDate"));
    console.log(localStorage.getItem("endDate"));
    if (
      localStorage.getItem("fromDate") !== null &&
      localStorage.getItem("endDate") !== null
    ) {
      this.getEventByDate();
    } else {
      this.getEventsList();
    }

    this.list = false;
    this.grid = true;
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
  }

  public buildDateForm() {
    this.dateRangeForm = this.formBuilder.group(
      {
        startDate: new FormControl("", [Validators.required]),
        endDate: new FormControl("", [Validators.required])
      },
      {
        validators: this.setMinDate.bind(this)
      }
    );
  }

  public getEventByDate() {
    this.spinner.show();
    // let dataParams = {
    //   lat: 28.644800,
    //   lon: 77.216721,
    //   endDate: localStorage.getItem('endDate'),
    //   fromDate: localStorage.getItem('fromDate')
    // }
    let dataParams = {
      lat: sessionStorage.getItem("lat"),
      lon: sessionStorage.getItem("lng"),
      endDate: localStorage.getItem("endDate"),
      fromDate: localStorage.getItem("fromDate")
    };
    this.dateRangeForm.controls["startDate"].setValue(
      new Date(localStorage.getItem("fromDate"))
    );
    this.dateRangeForm.controls["endDate"].setValue(
      new Date(localStorage.getItem("endDate"))
    );

    console.log(dataParams);
    this.eventsListService.getEventByDate(dataParams).subscribe(
      (data: any) => {
        if (data.success) {
          console.log(data.details);
          console.log(data);
          this.eventsListDetailsByDate(data);
          this.notiService.showSuccess(data.message, "", 4000);
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
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  private eventsListDetailsByDate(data) {
    this.spinner.hide();
    if (data.success) {
      data.details.map(item => {
        // if (item["summary"].length > 70) {
        //   item["summary"] = item["summary"].substr(0, 70) + "...";
        // }
        item["fromDate"] =
          item["fromDate"] == "" ? "" : new Date(item["fromDate"]);
        item["endDate"] =
          item["endDate"] == "" ? "" : new Date(item["endDate"]);
      });
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
      this.upcomingEventsData = this.orderPipe.transform(
        data.details,
        this.order
      );
    }
  }

  public getEventsList() {
    this.spinner.show();
    let dataParams = {
      lat: sessionStorage.getItem("lat"),
      lon: sessionStorage.getItem("lng")
    };

    // let dataParams = {
    //   lat: 28.644800,
    //   lon: 77.216721,
    // }

    this.eventsListService.getEvents(dataParams).subscribe(
      (data: any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.eventsListDetails(data);
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  private eventsListDetails(data) {
    this.spinner.hide();
    console.log(data);

    data.details.map(item => {
      // if (item["summary"].length > 70) {
      //   item["summary"] = item["summary"].substr(0, 70) + "...";
      // }
      item["fromDate"] =
        item["fromDate"] == "" ? "" : new Date(item["fromDate"]);
      item["endDate"] = item["endDate"] == "" ? "" : new Date(item["endDate"]);
    });
    this.upcomingEventsData = data.details;
  }

  public eventDetailsPage(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["events", id]);
  }

  public onViewChangeList() {
    this.list = true;
    this.grid = false;
  }

  public onViewChangeGrid() {
    this.list = false;
    this.grid = true;
  }

  // public default(event){
  //   this.src
  // }

  public searchEvents() {
    this.spinner.show();
    let dataParams = {
      // lat: 28.644800,
      // lon: 77.216721,
      lat: sessionStorage.getItem("lat"),
      lon: sessionStorage.getItem("lng"),
      endDate: new Date(
        this.dateRangeForm.controls["endDate"].value
      ).toString(),
      fromDate: new Date(
        this.dateRangeForm.controls["startDate"].value
      ).toString()
    };
    console.log(dataParams);
    this.eventsListService.getEventByDate(dataParams).subscribe(
      (data: any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.eventsListDetailsByDate(data);
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  public setMinDate(c: AbstractControl) {
    let startDate = new Date(c.get("startDate").value);
    this.endDateObj = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate()
    };
  }

  public buyTickets(data) {
    this.ticketData = data;
    console.log(data);
    if (sessionStorage.getItem("ID") !== null) {
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
              if (
                localStorage.getItem("fromDate") !== null &&
                localStorage.getItem("endDate") !== null
              ) {
                this.getEventByDate();
              } else {
                this.getEventsList();
              }
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

  public onPageChange(event) {
    console.log("pagechaged");
    console.log(event);
  }
}
