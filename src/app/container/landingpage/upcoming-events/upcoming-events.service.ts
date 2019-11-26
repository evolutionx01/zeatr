import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UpcomingEventsService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public gettestUpcomingEvents(){
    return this.apiService.get('/public/event?lat=28.644800&lng=77.216721')
  }

  public getUpcomingEvents(params){
    return this.apiService.get('/public/event?lat='+params.lat+'&lng='+params.lng)
  }

  public getcategories() {
    return this.apiService.get('/categories')
  }

  public getCategoryEvents(id){
    return this.apiService.get('/event/getEventsByCategoryId/'+id)
  }
}
