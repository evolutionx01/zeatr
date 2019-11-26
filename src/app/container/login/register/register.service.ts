import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getRegisterationDetails(params) {
    return this.apiService.post('/user', params)
  }


}
