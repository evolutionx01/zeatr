import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _endPoint = `${environment.apiUrl}`; // normally you use environment.ts
  private _channel: any;
  user: any

  constructor(
    private _pusherService: PusherService,
    private _http: HttpClient
    ) {
    this._channel = this._pusherService.getPusher().subscribe('my-channel');
  }

  join(param): Observable<any> {
    return this._http.post(`${this._endPoint}/event/joinChat`, param)
      .pipe(tap(data => {
        this.user = param;
      }));

  }

  sendMessage(message: string): Observable<any> {
    const param = {
      postedByName: sessionStorage.getItem('name'),
      message,
      groupId:  parseInt(sessionStorage.getItem('ChatGroupId')),
      ...this.user
    };
    return this._http.post(`${this._endPoint}/event/message/post`, param);
  }

  getChannel() {
    return this._channel;
  }
}
