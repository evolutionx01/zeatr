import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturedArtistService {

  constructor(
    private apiService: ApiServiceService,
  ) { }

  public getFeaturedArtists(){
    return this.apiService.get('/public/featuredartists')
  }

  public getcategories() {
    return this.apiService.get('/categories')
  }
  public postArtistFollow(params){
    return this.apiService.post('/artist/follow', params)
  }

  public postArtistUnfollow(params){
    return this.apiService.post('/artist/unfollow', params)
  }
}
