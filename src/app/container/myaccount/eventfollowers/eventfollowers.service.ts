import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
@Injectable({
  providedIn: 'root'
})
export class EventfollowersService {

  constructor( private apiService: ApiServiceService,) { }

  public getEventFollowerList(params){
    return this.apiService.post('/event/followers', params)
  }
}
