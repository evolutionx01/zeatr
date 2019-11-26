import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistViewService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getArtistData(params){
    return this.apiService.get('/artist/'+params)
  }

  public getPublicArtistData(params){
    return this.apiService.get('/publicartist/'+params)
  }
  
  public postArtistFollow(params){
    return this.apiService.post('/artist/follow', params)
  }

  public postArtistUnfollow(params){
    return this.apiService.post('/artist/unfollow', params)
  }



}
