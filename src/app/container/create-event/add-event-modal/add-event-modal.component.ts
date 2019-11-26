import { Component, OnInit, Input } from "@angular/core";
import { AddEventModalService } from "./add-event-modal.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-event-modal",
  templateUrl: "./add-event-modal.component.html",
  styleUrls: ["./add-event-modal.component.scss"]
})
export class AddEventModalComponent implements OnInit {
  @Input() searchType;
  public title: any;
  public data: any = [];

  constructor(
    private addEventModalService: AddEventModalService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if (this.searchType.type == "venues") {
      this.title = "Venues";
      this.getVenueDetails();
    } else if (this.searchType.type == "artists") {
      this.title = "Artists";
      this.getArtistDetails();
    } else if (this.searchType.type == "services") {
      this.title = "Services";
      this.getServiceDetails();
    }
  }

  public getVenueDetails() {
    this.addEventModalService.getVenue().subscribe(data => {
      this.venueDetails(data);
    });
  }
  private venueDetails(data) {
    if (data.success) {
      data.details.map(item=>{
        let idx = this.searchType.array.findIndex(
          i => parseInt((i.value).split('#')[1]) == item.id
        );
        if (idx == -1){
          this.data.push(item);
        }
      })
      this.data = this.data;
    }
  }

  public getArtistDetails() {
    this.addEventModalService.getArtist().subscribe(data => {
      this.artistDetails(data);
    });
  }

  private artistDetails(data) {
    if (data.success) {
      data.details.map(item=>{
        let idx = this.searchType.array.findIndex(
          i => parseInt((i.value).split('#')[1]) == item.user.id
        );
        if (idx == -1){
          item.user["name"] = item.user["firstName"] + " " + item.user["lastName"];
          this.data.push(item.user);
        } 
      })
      this.data = this.data;
    }
  }

  public getServiceDetails() {
    this.addEventModalService.getService().subscribe(data => {
      this.serviceDetails(data);
    });
  }

  private serviceDetails(data) {
    if (data.success) {
      data.details.forEach(element => {
        let idx = this.searchType.array.findIndex(
          i => parseInt((i.value).split('#')[1]) == element.id
        );
        if (idx == -1) this.data.push(element);
      });
      this.data = this.data;
    }
  }

  public selectedItem(data) {
    let dataId = this.pad(data.id, 4);
    let params = {
      success: "yes",
      data: data.name + " (#" + dataId + ")"
    };
    this.activeModal.close(params);
  }

  actionClicked(data) {
    this.activeModal.close(data);
  }

  public pad(n, width) {
    n = n + "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join("0") + n;
  }
}
