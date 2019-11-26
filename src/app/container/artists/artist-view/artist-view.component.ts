import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ArtistViewService } from "./artist-view.service";
import { Lightbox } from "ngx-lightbox";
import { environment } from "src/environments/environment";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { SigninComponent } from '../../login/signin/signin.component';
import { ArtistVideoModalComponent } from '../artist-video-modal/artist-video-modal.component';

@Component({
  selector: "app-artist-view",
  templateUrl: "./artist-view.component.html",
  styleUrls: ["./artist-view.component.scss"]
})
export class ArtistViewComponent implements OnInit {
  public artistImages: any;
  public artistVideo: any;
  public artistId: any;
  public follow: boolean;
  public user_id: any;
  public showPremium: any;
  public showCarousel: boolean;
  public artist_id: any;

  public artistName: string;
  public description: string;

  public showImageCarousel: boolean;

  public showVideoCarousel: boolean;
  public showImage: boolean;
  public showVideo: boolean;

  public _artistImageAlbums: any = [];
  public profilePic: string;
  public category: string;
  public address: object;
  public toggleData: object;
  public Awards_Acheivements: any = [];
  public isAddressAvailable: boolean = false;
  public genre: string;
  public showFollow: boolean;
  source: string;
  repoUrl: string;
  public mailSubject: string

  public modalOption: NgbModalOptions = {};
  scheduleParticipantList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private artistViewService: ArtistViewService,
    private _lightbox: Lightbox,
    private router: Router,
    private modalService: NgbModal,
    private notiService: ToasterNotiService,

  ) { }

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.user_id = parseInt(sessionStorage.getItem('ID'))
    this.source = localStorage.getItem("source");
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
      this.artist_id = data.artist_id;
    });

    if (this.user_id) {
      this.showFollow = true
      this.getArtistDetails();
    } else {
      this.showFollow = false
      this.getPublicArtistDetails();
    }

    // this.showCarousel = true

    this.repoUrl = `${environment.domainUrl}` + "/#" + this.router.url;
  }

  public getPublicArtistDetails() {
    this.spinner.show();
    this.artistViewService.getPublicArtistData(this.artist_id).subscribe((data: any) => {
      console.log("ARTISI DATA.............", data);
      if (data.success) {
        this.notiService.showSuccess(data.message, "", 4000);
        this.artistDetails(data);
      } else {
        this.notiService.showError(data.message, "", 4000);

      }
    });
  }

  public getArtistDetails() {
    this.spinner.show();
    this.artistViewService.getArtistData(this.artist_id).subscribe(data => {
      console.log("ARTISI DATA.............", data);
      this.artistDetails(data);
    });
  }

  private artistDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.scheduleParticipantList = data.details.scheduleParticipantList;
      this.showPremium = data.details.user.userTemplate

      this.follow = data.details.follow
      this.artistId = data.details.user.id
      console.log(".....................", data.details);
      this.artistName =
        data.details.user.firstName + " " + data.details.user.lastName;
      this.mailSubject = "Checkout the details for "+ this.artistName
      this.description = data.details.user.description;
      this.artistImages = data.details.artistPublicPictures;
      this.showImage = this.artistImages.length == 0 ? false : true;
      this.showImageCarousel = this.artistImages.length > 4 ? true : false;
      this.artistVideo = data.details.artistPublicVideos;
      this.showVideo = this.artistVideo.length == 0 ? false : true;
      this.showVideoCarousel = this.artistVideo.length > 4 ? true : false;

      this.address = data.details.address;

      this.toggleData = data.details.toggleUserData;

      if (
        (!data.details.toggleUserData.street1 ||
          !data.details.toggleUserData.street2 ||
          !data.details.toggleUserData.country ||
          !data.details.toggleUserData.city ||
          !data.details.toggleUserData.state ||
          !data.details.toggleUserData.zipcode) &&
        (data.details.address.street1 !== null ||
          data.details.address.street2 !== null ||
          data.details.address.country !== null ||
          data.details.address.city !== null ||
          data.details.address.state !== null ||
          data.details.address.zipcode !== null)
      ) {
        this.isAddressAvailable = true;
      } else {
        this.isAddressAvailable = false;
      }

      let array = [];

      if (!data.details.toggleUserData.awards == true && data.details.userOtherdetails.awards !== null) {
        this.showCarousel = true;
        data.details.userOtherdetails.awards.map((item: any) => {
          array.push(item);
        });
        // this.Awards_Acheivements.push(array);
      }

      if (!data.details.toggleUserData.achievements == true && data.details.userOtherdetails.achievements !== null) {
        this.showCarousel = true;
        data.details.userOtherdetails.achievements.map((item: any) => {
          array.push(item);
        });
        // this.Awards_Acheivements.push(array);
      }
      // console.log(array);
      this.Awards_Acheivements = array;
      console.log(data.details.userOtherdetails);
      this.profilePic = data.details.user.profilePic;
      this.category = data.details.category;
      this.genre = data.details.subCategory;
      this.artistImages.map(item => {
        const src = item["location"];
        const caption = item["title"];

        const album = {
          src: src,
          caption: caption
        };

        this._artistImageAlbums.push(album);
      });

      console.log(this._artistImageAlbums);
    }
  }

  artistAwards: any = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fas fa-chevron-circle-left'></i>",
      "<i class='fas fa-chevron-circle-right'></i>"
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

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._artistImageAlbums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  public followArtist() {
    this.spinner.show()
    let params = {
      user: parseInt(sessionStorage.getItem('ID')),
      artist: this.artistId
    }

    this.artistViewService.postArtistFollow(params).subscribe(
      data => {
        console.log(data)
        this.unfollowDetails(data)
      }
    )
  }

  public unfollowArtist() {
    this.spinner.show()
    let params = {
      user: parseInt(sessionStorage.getItem('ID')),
      artist: this.artistId
    }

    this.artistViewService.postArtistUnfollow(params).subscribe(
      data => {
        console.log(data)
        this.unfollowDetails(data)
      }
    )
  }

  private unfollowDetails(data) {
    if (data.success) {
      this.getArtistDetails();
    }
  }

  public login() {
    let dataParams = {}

    const confRef = this.modalService.open(SigninComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result.then((result) => {
      console.log(result)
      if (result == 'yes') {
        this.showFollow = true
        this.getArtistDetails();
      } else if (result == 'no') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  public showArtistVideoView(data) {
    // console.log(data)
    let dataParams = {
      data: data
    };

    const confRef = this.modalService.open(ArtistVideoModalComponent, this.modalOption);
    confRef.componentInstance.videoData = dataParams;

    confRef.result
      .then(result => {
        // console.log(result)
        if (result.success == "yes") {
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  routeToEvents(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["events", id]);
  }
}
