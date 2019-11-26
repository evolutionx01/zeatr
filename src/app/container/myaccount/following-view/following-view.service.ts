import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class FollowingViewService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public postFollowingList(params){
    return this.apiService.post('/artist/following', params)
  }
}
