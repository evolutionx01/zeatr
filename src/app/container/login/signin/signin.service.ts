import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getLoginDetails(params) {
    return this.apiService.post('/authenticate', params)
  }

}
