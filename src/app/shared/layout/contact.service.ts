import { Injectable } from '@angular/core';
import { ApiServiceService } from '../services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public apiService:ApiServiceService) { 

    
  }

  sendMessage(params){
    return this.apiService.post('/user/contactus',params)
  }
}
