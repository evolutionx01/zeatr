import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
@Injectable()
export class PusherService {

  private _pusher: any;

  constructor() {
    this._pusher = new Pusher('583cd532d96c97b62737', {
      cluster: 'ap2',
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this._pusher;
  }
}
