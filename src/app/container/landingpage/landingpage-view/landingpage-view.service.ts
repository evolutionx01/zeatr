import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



// import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingpageViewService {

  constructor(
    private apiService: ApiServiceService,
    private http: HttpClient
  ) { }

  public getFeaturedArtists(){
    return this.apiService.get('/public/artist')
  }

  public gettestUpcomingEvents(){
    return this.apiService.get('/public/event?lat=40.730610&lng=-73.935242')
  }

  public getUpcomingEvents(params){
    return this.apiService.get('/public/event?lat='+params.lat+'&lng='+params.lng)
  }

  public getSearchResultArtist(params){
    return this.apiService.get('/user/search?q='+params)
  }

  public getSearchResultEvent(params){
    return this.apiService.get('/event/search?q='+params)
  }

  


  public getLandingPageArtistEvents(params){
    let artists =  this.apiService.get('/public/artist');
    let events =  this.apiService.get('/public/event?lat='+params.lat+'&lng='+params.lng);

    return forkJoin([artists,events]);
  }

  public getIpAddress(){
    return this.http.get(`${environment.apiForIp}`)
  }

  public verifyMail(params){
    return this.apiService.get('/verify?mail='+params.mail+'&code='+params.code)
  }


}
