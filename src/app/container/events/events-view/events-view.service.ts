import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventsViewService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getEventDetails(id){
    return this.apiService.get('/event/'+id)
  }

  public followevent(params){
    return this.apiService.post('/event/follow',params)
  }

  public unfollowevent(params){
    return this.apiService.post('/event/unfollow',params)
  }
}
