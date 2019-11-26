import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private login = new Subject<any>();
  public $loginObservable = this.login.asObservable();

  private value = new Subject<any>();
  public $value = this.value.asObservable();

  loggedIn(status:boolean){
		this.login.next(status);	
  }

  getStatus(value:boolean){
    this.value.next(value);
  }


}
