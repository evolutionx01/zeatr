import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AddEventModalService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getVenue(){
    return this.apiService.get('/venue')
  }


  public getArtist(){
    return this.apiService.get('/public/artist')
  }


  public getService(){
    return this.apiService.get('/public/service')
  }
}
