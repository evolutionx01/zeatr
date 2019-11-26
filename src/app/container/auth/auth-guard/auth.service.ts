import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(
   // private apiService: ApiService,
  ) { }

  isLoggedIn(): Boolean  {
  //  const helper = new JwtHelperService();
    let token = sessionStorage.getItem('token');
    // let tokenExpired = helper.isTokenExpired(token) ? true : false;
    return (token) ? true : false;
  }

}
