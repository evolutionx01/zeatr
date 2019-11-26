import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private apiService: ApiServiceService, ) { }

  public updatePassword(params) {
    return this.apiService.put('/user/resetpassword', params)
  }
}
