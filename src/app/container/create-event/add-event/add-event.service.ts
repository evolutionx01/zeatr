import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AddEventService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public createEvent(params){
    return this.apiService.post('/event', params)
  }

  public editEvent(params){
    return this.apiService.get('/event/'+params)
  }

  public getVenue(){
    return this.apiService.get('/venue')
  }

  
  public getArtist(){
    return this.apiService.get('/public/artist')
  }


  public getService(){
    return this.apiService.get('/public/service')
  }

  public postVenue(params){
    return this.apiService.post('/venue', params)
  }

  public updateVenue(params){
    return null
    // this.apiService.put('/venue', params)
  }

  public isVenueExists(params){
    return null;
    this.apiService.post('/', params)
  }

  public checkSlug(params){
    return this.apiService.get('/event/checkeventslugname/'+params)
  }
}
