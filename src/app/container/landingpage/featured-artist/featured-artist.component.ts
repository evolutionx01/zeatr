import { Component, OnInit } from '@angular/core';
import { FeaturedArtistService } from './featured-artist.service';
import { Router } from '@angular/router';
import { ToasterNotiService } from '../../../shared/services/notification/toaster-noti.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCarouselConfig, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SigninComponent } from '../../login/signin/signin.component';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-featured-artist',
  templateUrl: './featured-artist.component.html',
  styleUrls: ['./featured-artist.component.scss'],
  providers: [DatePipe, NgbCarouselConfig],
  
})
export class FeaturedArtistComponent implements OnInit {

  public modalOption: NgbModalOptions = {};
  public category: any 

  public featuredArtistsData: any;
  user_id: number;
  showFollow: boolean;
  order: string = 'firstName';
  constructor(
    private featuredArtistService: FeaturedArtistService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.user_id = parseInt(sessionStorage.getItem('ID'))
    this.getCategory();
    this.featuredArtists();
    if (this.user_id) {
      this.showFollow = true;
    } else {
      this.showFollow = false;
    }
  }

  public getCategory() {
    this.featuredArtistService.getcategories().subscribe(
      data => {
        this.category = data
      }
    )
  }

  public featuredArtists() {
    this.featuredArtistService.getFeaturedArtists().subscribe(
      data => {
        this.featuredArtistsDetails(data);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      }
    )
  }

  private featuredArtistsDetails(data) {
    if (data.success) {
      // data.details.forEach(element => {
      //   data.details['follow'] = element.follow;
      // });
      this.featuredArtistsData = this.orderPipe.transform(data.details, this.order);
    }

  }


  public artistListingPage() {
    this.router.navigate(['artists']);
  }

  public artistDetailPage(id){
    localStorage.setItem('source',this.router.url);
    this.router.navigate(['artists', id]);
  }
   public getArtistDetails(){
     
   }

   public login() {
    let dataParams = {}

    const confRef = this.modalService.open(SigninComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result.then((result) => {
      if (result == 'yes') {
        this.showFollow = true
        this.user_id = parseInt(sessionStorage.getItem('ID'));
        this.featuredArtists();
      } else if (result == 'no') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  public followArtist(id) {
    this.spinner.show()
    let params = {
      user: this.user_id,
      artist: id
    }

    this.featuredArtistService.postArtistFollow(params).subscribe(
      data => {
        this.featuredArtists();
      }
    )
  }

  public unfollowArtist(id) {
    this.spinner.show()
    let params = {
      user: this.user_id,
      artist: id
    }

    this.featuredArtistService.postArtistUnfollow(params).subscribe(
      data => {
        this.featuredArtists();
      }
    )
  }
}
