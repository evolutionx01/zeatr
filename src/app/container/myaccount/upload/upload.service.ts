import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public uploadProfileImage(params){
    return this.apiService.postFile('/user/avatar', params)
  }

  public uploadImage(params){
    return this.apiService.postFile('/picture', params)
  }

  public uploadVideo(params){
    return this.apiService.postFile('/video/upload', params)
  }

  public uploadYoutubeVideo(params){
    return this.apiService.post('/video', params)
  }
}
