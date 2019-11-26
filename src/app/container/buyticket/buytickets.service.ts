import { Injectable } from "@angular/core";
import { ApiServiceService } from "src/app/shared/services/api-service/api-service.service";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class BuyticketsService {
  constructor(private apiService: ApiServiceService,
    private _http: HttpClient) {}

  public buyTickets(params) {
    return this.apiService.put('/updateEventTickets', params)
  }

  public thirdParty(params){
    return this._http.post('https://demo.mobiversa.com/moApi/', params);

  }
}
