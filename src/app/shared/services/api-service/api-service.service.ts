import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  private setHeaders() {
    let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'access-token': token
      })
    };
    return httpOptions;
  }

  private setMultiDataHeaders() {
    let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': "multipart/form-data",
        'access-token': token
      })
    };
    return httpOptions;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      `${JSON.stringify(error.error.error)}`
    );
  };


  get(pathUrl) {

    return this.http.get(`${environment.apiUrl}${pathUrl}`, this.setHeaders())
      .pipe(
        catchError(this.handleError)
      )
  }

  post(postUrl, body: Object) {
    return this.http.post(`${environment.apiUrl}${postUrl}`, JSON.stringify(body), this.setHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(delUrl) {
    return this.http.delete(`${environment.apiUrl}${delUrl}`, this.setHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  put(putUrl, body: Object) {
    return this.http.put(`${environment.apiUrl}${putUrl}`, JSON.stringify(body), this.setHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  postFile(postUrl, body: any) {
    return this.http.post(`${environment.apiUrl}${postUrl}`, body, this.setMultiDataHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

}
