import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventfollowersService} from '../../myaccount/eventfollowers/eventfollowers.service';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';

@Component({
  selector: 'app-eventfollowers',
  templateUrl: './eventfollowers.component.html',
  styleUrls: ['./eventfollowers.component.scss']
})
export class EventfollowersComponent implements OnInit {
  followerList: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private EventfollowersService:EventfollowersService,
    private notiService:ToasterNotiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      let params = { 
        event : data.id
      }
      this.EventfollowersService.getEventFollowerList(params).subscribe((data:any)=>{
        this.followerList = data.details;
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      })
    })
  }

}
