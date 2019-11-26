import { Component, OnInit } from '@angular/core';
import { FollowerViewService } from './follower-view.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-follower-view',
  templateUrl: './follower-view.component.html',
  styleUrls: ['./follower-view.component.scss']
})
export class FollowerViewComponent implements OnInit {
  public followerList: any;

  constructor(
    private followerViewService: FollowerViewService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getFollowersList()

  }

  public getFollowersList() {
    this.spinner.show()
    let params = {

    }
    this.followerViewService.postFollowerList(params).subscribe(
      data => {
        this.followerDetails(data)
      }
    )
  }

  public followerDetails(data){
    this.spinner.hide()
    if(data.success){
       this.followerList = data.details
    }
  }

}
