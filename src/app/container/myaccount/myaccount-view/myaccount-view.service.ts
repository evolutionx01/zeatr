import { Injectable } from "@angular/core";
import { ApiServiceService } from "../../../shared/services/api-service/api-service.service";

@Injectable({
  providedIn: "root"
})
export class MyaccountViewService {
  constructor(private apiService: ApiServiceService) {}

  public getMyAccountsDetails(params) {
    return this.apiService.get("/accountDetails?userId=" + params);
  }

  public putUpdateAccount(params) {
    return this.apiService.put("/user", params);
  }

  public delete(params) {
    return this.apiService.put("/delete/public", params);
  }

  public makePublicOrPrivate(params) {
    return this.apiService.put("/toggle/public", params);
  }

  public deleteItem(id) {
    return this.apiService.delete("/event?eventId=" + id);
  }

  public getcategories() {
    return this.apiService.get("/categories");
  }

  public getsubcategories(id) {
    return this.apiService.get("/subcategories/" + id);
  }

  public toggleSwitch(params) {
    return this.apiService.put("/toggle", params);
  }

  public makePublicOrPrivateVenue(id, params) {
    return this.apiService.put("/venuePrivatePublic/" + id, params);
  }

  public postVenue(params) {
    return this.apiService.post("/venue", params);
  }

  public updateVenue(id, params) {
    return this.apiService.put("/venue/" + id, params);
  }

  public requestRole() {
    return null;
    // this.apiService.put('/',params)
  }

  public userTemplate(params) {
    return this.apiService.put("/user/updateTemplate", params);
  }
  public cancelBooking(params) {
    return this.apiService.put("/cancelEventTickets", params);
  }

  public postService(params) {
    return this.apiService.post("/service", params);
  }

  public makePublicOrPrivate_Service(id,params) {
    return this.apiService.put("/servicePublicPrivate/" +id,params);
  }

  public delService(id) {
    return this.apiService.delete("/service/" +id);
  }

  public checkSlug(slug) {
    return this.apiService.get("/artist/checkartistslugname/" + slug);
  }
}
