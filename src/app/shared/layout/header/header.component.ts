import { Component, OnInit } from "@angular/core";
import { NgbModalOptions, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SigninComponent } from "../../../container/login/signin/signin.component";
import { RegisterComponent } from "../../../container/login/register/register.component";
import { ToasterNotiService } from "../../services/notification/toaster-noti.service";
import { CommonService } from "../../common/common.service";
import { Router } from "@angular/router";
import { HeaderService } from "./header.service";
import { AdminloginComponent } from "src/app/container/admin/login/adminlogin.component";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public modalOption: NgbModalOptions = {};
  public username: string;
  public showUserDetails: any;
  public userName: any;
  isAdmin: boolean;
  admin: string;

  constructor(
    private modalService: NgbModal,
    private notiService: ToasterNotiService,
    private commonService: CommonService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.commonService.$loginObservable.subscribe(data => {
      console.log(data);
      if (data) {
        this.loggedUserDetails();
      }
    });
    // this.username = localStorage.getItem('name');
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";
    this.loggedUserDetails();
  }

  public loggedUserDetails() {
    console.log(sessionStorage.getItem("emailId"));

    if (sessionStorage.getItem("emailId") != null) {
      this.showUserDetails = true;
      this.userName = sessionStorage.getItem("name");
      this.admin = sessionStorage.getItem("admin");
    } else {
      this.showUserDetails = false;
    }
  }

  public login() {
    let dataParams = {};

    const confRef = this.modalService.open(SigninComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result == "yes") {
        } else if (result == "no") {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  public register() {
    let dataParams = {};

    const confRef = this.modalService.open(RegisterComponent, this.modalOption);
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result == "yes") {
        } else if (result == "no") {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  public logout() {
    this.headerService.getLogoutDetails().subscribe(data => {
      this.logoutUserDetails(data);
    });
  }

  private logoutUserDetails(data) {
    if (data.success) {
      this.notiService.showSuccess(data.message, "", 4000);
      sessionStorage.clear();
      this.showUserDetails = false;
      this.router.navigate([""]);
    } else {
      this.notiService.showError(data.message, "", 4000);
    }
  }

  public myAccounts() {
    if (this.admin != "true") this.router.navigate(["myaccount"]); else return false;
  }

  public adminLogin() {
    let dataParams = {};

    const confRef = this.modalService.open(
      AdminloginComponent,
      this.modalOption
    );
    confRef.componentInstance.dataStatus = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result == "yes") {
          this.loggedUserDetails();
        } else if (result == "no") {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
