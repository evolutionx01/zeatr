import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbTabsetConfig } from "@ng-bootstrap/ng-bootstrap";
import { BuyticketsService } from "./buytickets.service";
import { ToasterNotiService } from "src/app/shared/services/notification/toaster-noti.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-buyticket",
  templateUrl: "./buyticket.component.html",
  styleUrls: ["./buyticket.component.scss"],
  providers: [NgbTabsetConfig]
})
export class BuyticketComponent implements OnInit {
  childValue: number = 0;
  adultValue: number = 0;
  @Input() ticketsDetails;

  public eventName: string;
  public eventDate: any;
  public eventVenue: string;
  availableTickets: any;
  eventTickets: any;
  purchaseTickets: number = 0;
  isProceed: boolean = true;
  list: any;
  sum: number = 0;
  fromDate: Date;
  endDate: Date;
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbTabsetConfig,
    private buyticketservice: BuyticketsService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
  ) {
    config.justify = "center";
    config.type = "pills";
  }

  ngOnInit() {
    this.eventTickets = this.ticketsDetails.data.eventTickets;
    this.ticketsDetails = this.ticketsDetails.data;
    // this.eventName = this.ticketsDetails.data.name
    this.fromDate = new Date(this.ticketsDetails.fromDate)
    this.endDate = new Date(this.ticketsDetails.endDate)
    // this.eventVenue = "Malaysia";
    // this.availableTickets = this.ticketsDetails.data.availableTickets;
  }

  actionClicked(data) {
    this.activeModal.close(data);
  }

  selectedNumber() { }

  getValue(x) {
    x.childValue = !x.childValue ? 0 : x.childValue;
    x.adultValue = !x.adultValue ? 0 : x.adultValue;
    x.OKUValue = !x.OKUValue ? 0 : x.OKUValue;
    if (!x.buyTickets) x.buyTickets = 0;
    if (!x.totalPrice) x.totalPrice = 0;
    x.buyTickets =
      parseFloat(x.adultValue) +
      parseFloat(x.childValue) +
      parseFloat(x.OKUValue);
    x.totalPrice =
      Math.round(parseFloat(x.adultValue) * x.priceAdult +
        parseFloat(x.childValue) * x.priceChild +
        parseFloat(x.OKUValue) * x.priceOku);
    this.sum = 0;
    this.eventTickets.forEach(element => {
      if (element.totalPrice == undefined) element["totalPrice"] = 0;
      this.sum = Math.round(this.sum + parseFloat(element.totalPrice));
    });

    if (x.buyTickets > x.available) x.exceed = true;
    else x.exceed = false;
    if (x.exceed == true || this.sum == 0) this.isProceed = true;
    else this.isProceed = false;
 }

  buyTickets() {
    console.log(this.eventTickets)
    let arr = [];
    this.eventTickets.forEach(element => {
      if (element.buyTickets !== 0 && element.buyTickets !== undefined) {
        arr.push({
          id: element.id,
          zone: element.zone,
          totalBuyedTickets:
            element.buyTickets == undefined ? 0 : element.buyTickets,
          adultValue: element.adultValue == undefined ? 0 : element.adultValue,
          childValue: element.childValue == undefined ? 0 : element.childValue,
          OKUValue: element.OKUValue == undefined ? 0 : element.OKUValue,
          price: element.totalPrice == undefined ? 0 : element.totalPrice
        });
      }
    });
    this.list = arr;
    let params = {
      bookingId: "#54321",
      eventId: this.ticketsDetails.id,
      buyedTicketsList: this.list,
      ticketInfo: JSON.stringify(this.list)
    };
    this.buyticketservice.buyTickets(params).subscribe(data => {
      if (data["success"]) {
        this.notiService.showSuccess(data["message"], "", 4000);
        this.activeModal.close("yes");
      } else {
        this.notiService.showError(data["message"], "", 4000);
      }
    });
  }
}
// }
