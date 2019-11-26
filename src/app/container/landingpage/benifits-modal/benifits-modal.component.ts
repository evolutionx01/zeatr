import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-benifits-modal',
  templateUrl: './benifits-modal.component.html',
  styleUrls: ['./benifits-modal.component.scss']
})
export class BenifitsModalComponent implements OnInit {

  @Input() benifitType;
  public title: string;
  public data: any;

  public artistList: any = [
    { description: "Profile maintenance" },
    { description: "Connect with peers, other artists from different fields" },
    { description: "Connect with event organizers, venues" },
    { description: "Become an event organizer" },
    { description: "Plan an event and rope in all resources" },
    { description: "Personalized invitation to audience group" },
    { description: "Self-promotion / Adverts" },
    { description: "Launch platform" },
    { description: "Calendar management (Public/Private)" },
    { description: "Event management" },
    { description: "Portfolio creation" },
    { description: "Create Community/Groups" },
    { description: "Connect with production houses" }
  ]

  public organizerList: any = [
    { description: "Event planner" },
    { description: "Bid for artists, auditorium, supporting functions" },
    { description: "Ticket sales platform" },
    { description: "Find audience preference and what is hot in the market" },
    { description: "Wide reach to the audience" },
    { description: "Calendar" },
    { description: "Event management" },
    { description: "Adverts" },
    { description: "Find partners" },
    { description: "Find sponsors" }
  ]

  public venueList: any = [
    { description: "Online booking" },
    { description: "Managing booking calendar" },
    { description: "Bid for booking" },
    { description: "Market value search" },
    { description: "Adverts" }
  ]

  public audienceList: any = [
    { description: "Follow your favorite artist" },
    { description: "Rate performance" },
    { description: "Find upcoming events" },
    { description: "Book tickets" },
    { description: "Become an organizer (Private/Public)" },
    { description: "Promote performances/ artists" }
  ]

  public productionList: any = [
    { description: "Talent Hunt" },
    { description: "Request for performances" },
    { description: "Project planner" },
    { description: "Adverts" }
  ]

  public supportList: any = [
    { description: "Event Management" },
    { description: "Technicians" },
    { description: "Orchestra" },
    { description: "Videography" },
    { description: "PR" },
    { description: "Media coverage request" },
    { description: "Concept Generator" },
    { description: "Portfolio creation assistance." },
    { description: "Product requests" },
    { description: "Packaged Schemes" }
  ]

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (this.benifitType.type == 1) {
      this.title = "Artists/Performance";
      this.data = this.artistList;
    } else if (this.benifitType.type == 2) {
      this.title = "Organizer";
      this.data = this.organizerList;
    } else if (this.benifitType.type == 3) {
      this.title = "Audience";
      this.data = this.audienceList;
    } else if (this.benifitType.type == 4) {
      this.title = "Venue";
      this.data = this.venueList;
    } else if (this.benifitType.type == 5) {
      this.title = "Production House/ Media";
      this.data = this.productionList;
    } else if (this.benifitType.type == 6) {
      this.title = "Supporting Function";
      this.data = this.supportList;
    }
  }

  actionClicked(data) {
    this.activeModal.close(data)
  }

}
