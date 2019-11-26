import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtistListService } from './artist-list.service';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbPaginationConfig, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { OrderPipe } from 'ngx-order-pipe';
import { SigninComponent } from '../../login/signin/signin.component';
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  providers: [NgbPaginationConfig]
})
export class ArtistListComponent implements OnInit {

  @ViewChild('pagination') pagination: any;
  public artistsData: any;
  public totalCount: any;
  public pageLimit: any;
  page = 1;
  order: string = 'firstName';
  user_id: number;
  showFollow: boolean;
  public modalOption: NgbModalOptions = {};
  constructor(
    private artistListService: ArtistListService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notiService : ToasterNotiService,
    private orderPipe: OrderPipe,
    private modalService: NgbModal,
  ) {

   }

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.user_id = parseInt(sessionStorage.getItem('ID'))
    this.totalCount = 200;
    this.pageLimit = 20;
    this.getArtistList();
  }

  public getArtistList(){
    this.spinner.show()
    this.artistListService.getArtist().subscribe(
      (data:any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.artistListDetails(data)
        } else {
          this.notiService.showError(data.message, "", 4000);
         
        }
       
      }
    )
  }

  private artistListDetails(data){
    // data.details.map(item =>{
    //   item['profilePic'] = `${environment.apiUrl}`+ item['profilePic']
    // })
    this.spinner.hide()
    if(data.success){
      // data.details.forEach(element => {
      //   data.details['follow'] = element.follow;
      // });
      this.artistsData = this.orderPipe.transform(data.details, this.order);
    }else{

    }
    
  }

  public artistDetailPage(id){
    localStorage.setItem('source',this.router.url);
    this.router.navigate(['artists', id]);
  }

  public onPageChange(event) {

  }
  public login() {
    let dataParams = {}

    const confRef = this.modalService.open(SigninComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result.then((result) => {

      if (result == 'yes') {
        this.showFollow = true
        this.user_id = parseInt(sessionStorage.getItem('ID'));
        this.getArtistList();
      } else if (result == 'no') {

      }
    }).catch((error) => {

    });
  }

  public followArtist(id) {
    this.spinner.show()
    let params = {
      user: this.user_id,
      artist: id
    }

    this.artistListService.postArtistFollow(params).subscribe(
      data => {
        this.getArtistList();
      }
    )
  }

  public unfollowArtist(id) {
    this.spinner.show()
    let params = {
      user: this.user_id,
      artist: id
    }

    this.artistListService.postArtistUnfollow(params).subscribe(
      data => {
        this.getArtistList();
      }
    )
  }
}
