import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistListService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getArtist(){
    return this.apiService.get('/public/artist')
  }
  public postArtistFollow(params){
    return this.apiService.post('/artist/follow', params)
  }

  public postArtistUnfollow(params){
    return this.apiService.post('/artist/unfollow', params)
  }
}
