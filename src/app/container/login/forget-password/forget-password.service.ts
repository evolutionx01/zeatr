import { Injectable } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(
    private apiservice:ApiServiceService
  ) { }

  public forgetPassword(params){
    return  this.apiservice.post('/forgotpassword',params)
   }
}
