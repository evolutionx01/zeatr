import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private apiService: ApiServiceService,
  ) { }


  public getLogoutDetails(){
    return this.apiService.get('/signout')
  }
}
