import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventsViewService } from "./events-view.service";
import { environment } from "../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from "@angular/common";
import { FacebookService, InitParams } from "ngx-facebook";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { PromptModalComponent } from "../../myaccount/prompt-modal/prompt-modal.component";
import { BuyticketComponent } from "../../buyticket/buyticket.component";
import { SigninComponent } from "../../login/signin/signin.component";
import { ToasterNotiService } from "src/app/shared/services/notification/toaster-noti.service";
import { AddReviewComponent } from '../../login/add-review/add-review.component';

@Component({
  selector: "app-events-view",
  templateUrl: "./events-view.component.html",
  styleUrls: ["./events-view.component.scss"],
  providers: [DatePipe]
})
export class EventsViewComponent implements OnInit {
  public rate: any;
  public modalOption: NgbModalOptions = {};
  public event_id: number;
  public eventName: any;
  public eventImg: any;
  organiserImg: any;
  profession: any;
  organiserName: string;
  startdate: any;
  enddate: any;

  public programDetails: any;
  public shareUrl: string;
  public participatingartists: any = [];
  public venuedetails: any = [];
  source: string;
  isOtherEvent: boolean = false;
  slug: string;
  availableTickets: number;
  eventData: any;
  iscancelled: any;
  user_ID: any;
  follow: boolean = true;
  hasTickets: boolean;
  repoUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsViewService: EventsViewService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private fb: FacebookService,
    private router: Router,
    private modalService: NgbModal,
    private notiService: ToasterNotiService
  ) {
    let initParams: InitParams = {
      appId: "1927971220769787",
      xfbml: true,
      version: "v2.8"
    };

    fb.init(initParams);
  }

  ngOnInit() {
    this.rate = 1;
    this.user_ID = JSON.parse(sessionStorage.getItem("ID"));
    this.source = localStorage.getItem("source");
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
      this.event_id = JSON.parse(data.event_id);
    });

    this.getEventDetails();
    console.log(this.router.url);
    this.shareUrl = `${environment.domainUrl}` + "/#" + this.router.url;
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.repoUrl = `${environment.domainUrl}` + "/#" + this.router.url;
  }

  public getEventDetails() {
    this.spinner.show();

    this.eventsViewService
      .getEventDetails(this.event_id)
      .subscribe((data: any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.eventDetails(data);
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      });
  }

  private eventDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.eventData = data.details.eventVO;
      console.log(data);
      this.follow = data.details.eventVO.follow;
      this.isOtherEvent = data.details.eb;
      this.slug = this.isOtherEvent ? data.details.eventVO.slug : "";
      this.eventName = data.details.eventVO.name;
      this.eventImg = data.details.eventVO.picture;
      this.organiserImg =
        data.details.organiser !== null &&
        data.details.organiser.profilePic !== null
          ? data.details.organiser.profilePic
          : "../../../../assets/images/default.png";
      this.profession =
        data.details.organiser !== null
          ? data.details.organiser.profession
          : "";
      this.organiserName =
        data.details.organiser !== null
          ? data.details.organiser.firstName +
            " " +
            data.details.organiser.lastName
          : "";
      this.programDetails = data.details.eventVO.summary;
      // this.participatingartists =
      //   data.details.eventVO.programs !== null
      //     ? data.details.eventVO.programs[0].artists
      //     : [];
      this.venuedetails =
        data.details.eventVO.programs !== null
          ? data.details.eventVO.programs[0].venues
          : data.details.eventVO.eventBriteVenueAddress;
      this.startdate = new Date(data.details.eventVO.fromDate);
      // this.startdate = this.datePipe.transform(new Date(this.startdate), 'MMMM dd y')
      this.enddate = new Date(data.details.eventVO.endDate);
      // this.enddate = this.datePipe.transform(new Date(this.enddate ), 'MMMM dd y')
      console.log(data.details.eventVO);
      let sum = 0;
      if (data.details.eb) {
        this.hasTickets = true;
        this.availableTickets = 1;
      } else if (
        data.details.eventVO.eventTickets !== null &&
        data.details.eventVO.eventTickets.length !== 0
      ) {
        this.hasTickets = true;
        data.details.eventVO.eventTickets.forEach(ele => {
          sum = sum + ele.available;
        });
        this.availableTickets = sum;
      } else {
        this.hasTickets = false;
      }
      // if (data.details.eventVO.eventTickets.length !== 0) {
      //   this.hasTickets = true;
      //   data.details.eventVO.eventTickets.forEach(ele => {
      //     sum = sum + ele.available;
      //   });
      // } else {
      //   this.hasTickets = false;
      // }
      // this.availableTickets = this.isOtherEvent ? 1 : sum;
      this.iscancelled = data.details.eventVO.eventCancel;
      console.log(this.availableTickets);
      if (data.details.eventVO.programs !== null) {
        data.details.eventVO.programs[0].artists.forEach(element => {
          element["id"] = parseInt(element.value.split("#")[1]);
        });
        this.participatingartists = data.details.eventVO.programs[0].artists;
      } else {
        this.participatingartists = [];
      }
    } else {
      this.notiService.showError(data.message, "", 4000);
    }
  }

  public buyTickets() {
    if (sessionStorage.getItem("ID") !== null) {
      if (this.isOtherEvent) {
        let confRef = this.modalService.open(
          PromptModalComponent,
          this.modalOption
        );
        confRef.componentInstance.bindContentType = "Other";
        confRef.result.then(result => {
          if (result == "Yes") {
            window.open(this.slug, "_blank");
          } else {
            return;
          }
        });
      } else {
        let dataParams = {
          data: this.eventData
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
              this.getEventDetails();
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
            this.buyTickets();
          } else if (result == "no") {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  followEvent() {
    let params = {
      user: this.user_ID,
      event: this.event_id
    };
    this.eventsViewService.followevent(params).subscribe((data: any) => {
      if (data.success) {
        // this.notiService.showSuccess(data.message, "", 4000);
        this.getEventDetails();
      } else {
        this.notiService.showError(data.message, "", 4000);
      }
    });
  }
  unfollowEvent() {
    let params = {
      user: this.user_ID,
      event: this.event_id
    };
    this.eventsViewService.unfollowevent(params).subscribe((data: any) => {
      if (data.success) {
        // this.notiService.showSuccess(data.message, "", 4000);
        this.getEventDetails();
      } else {
        this.notiService.showError(data.message, "", 4000);
      }
    });
  }

  login() {
    let dataParams = {};

    const confRef = this.modalService.open(SigninComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result == "yes") {
          this.user_ID = JSON.parse(sessionStorage.getItem("ID"));
          this.getEventDetails();
        } else if (result == "no") {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  routeToProfile(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["artists", id]);
  }

  public onRateChanges(event){
    console.log(event)
  }

  addReview() {
    let dataParams = {};

    const confRef = this.modalService.open(AddReviewComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result == "yes") {
        
        } else if (result == "no") {
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
