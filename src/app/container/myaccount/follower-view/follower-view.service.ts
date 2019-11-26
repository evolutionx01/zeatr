import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class FollowerViewService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public postFollowerList(params){
    return this.apiService.post('/artist/followers', params)
  }
}
