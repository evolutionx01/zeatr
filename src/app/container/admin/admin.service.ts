import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../app/shared/services/api-service/api-service.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService : ApiServiceService) { }

  login(data){
    return this.apiService.post('/',data)
  }
}
