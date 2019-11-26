import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getChangePassword(params) {
    return this.apiService.put('/user/changepassword', params)
  }
  
}
