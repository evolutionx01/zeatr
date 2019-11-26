import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventsListService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getEvents(params){
    return this.apiService.get('/public/event?lat='+params.lat+'&lng='+params.lng)
  }

  public gettestUpcomingEvents(){
    return this.apiService.get('/public/event?lat=17.4501615&lng=78.3671454')
  }

  public getEventByDate(params){
    return this.apiService.post('/event/searchbyDate', params)
  }
}
