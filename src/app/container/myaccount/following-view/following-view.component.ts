import { Component, OnInit } from '@angular/core';
import { FollowingViewService } from './following-view.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-following-view',
  templateUrl: './following-view.component.html',
  styleUrls: ['./following-view.component.scss']
})
export class FollowingViewComponent implements OnInit {
  public followingList: any;

  constructor(
    private followingViewService: FollowingViewService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getFollowingList()
  }

  public getFollowingList(){
    this.spinner.show()
    let params ={

    }
    this.followingViewService.postFollowingList(params).subscribe(
      data=>{
        this.followingDetails(data)
      }
    )
  }

  private followingDetails(data){
    this.spinner.hide()
    if(data.success){
       this.followingList = data.details
    }
  }

}
