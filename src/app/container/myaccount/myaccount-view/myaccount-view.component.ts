import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  NgbDateStruct,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModalOptions,
  NgbCarouselConfig,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { MyaccountViewService } from "./myaccount-view.service";
import { ToasterNotiService } from "../../../shared/services/notification/toaster-noti.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../environments/environment";
import { UploadComponent } from "../upload/upload.component";
import { Router } from "@angular/router";
import { Lightbox } from "ngx-lightbox";
import { PromptModalComponent } from "../prompt-modal/prompt-modal.component";
import { VideoViewModalComponent } from "../video-view-modal/video-view-modal.component";

import { ChangePasswordComponent } from "../change-password/change-password.component";
import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import { ChatService } from "../../chat-view/services/chat.service";
import { ChatComponent } from "../../chat-view/chat/chat.component";
import { AddVenueModalComponent } from "../../create-event/add-venue-modal/add-venue-modal.component";
import { AddEventService } from "../../create-event/add-event/add-event.service";
import { CommonService } from "src/app/shared/common/common.service";
import { ServiceComponent } from "../service/service.component";
import { OrderPipe } from "ngx-order-pipe";

@Component({
  selector: "app-myaccount-view",
  templateUrl: "./myaccount-view.component.html",
  styleUrls: ["./myaccount-view.component.scss"],
  providers: [
    DatePipe,
    NgbCarouselConfig,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class MyaccountViewComponent implements OnInit {
  public modalOption: NgbModalOptions = {};
  public selectedCityName = "Basic";

  public cities3 = [
    {
      id: 1,
      name: "Basic",
      avatar:
        "//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x"
    },
    {
      id: 2,
      name: "Premium",
      avatar:
        "//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15"
    }
  ];

  public list: boolean;
  public artistDetails: FormGroup;
  public artistAwards: FormGroup;
  public artistOthers: FormGroup;
  public artistProfession: FormGroup;
  public likesForm: FormGroup;

  public social: FormGroup;
  public addressDetails: FormGroup;

  public accountData: any;
  public accountName: string;
  public accountMail: string;

  public followers: number;
  public following: number;

  public profileStatus: number;

  public profilePercentage: any;

  public eventDetails: any;
  public imageGallery: any = [];
  public videoGallery: any = [];
  public profilePicture: any;

  public _imageAlbums: any = [];

  public userID: number;
  public isPublic: boolean;
  public listOfVenue: any = [];

  private emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  websitePattern: any =
    "^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$";
  private mobilePattern: any = "^((\\+91-?)|0)?[0-9]{11}$";
  categories: any = [];
  subcategories: any = [];
  mobileToggle: boolean = false;
  phoneToggle: boolean = false;
  faxToggle: boolean = false;
  websiteToggle: boolean = false;
  dobToggle: boolean = false;
  genderToggle: boolean = false;
  schoolsToggle: boolean = false;
  certificatesToggle: boolean = false;
  acheivementsToggle: boolean = false;
  awardsToggle: boolean = false;
  talentSynopsis: boolean = false;
  trainingsToggle: boolean = false;
  futurePerformancesToggle: boolean = false;
  pastPerformancesToggle: boolean = false;
  facebookToggle: boolean = false;
  twitterToggle: boolean = false;
  instagramToggle: boolean = false;
  googleToggle: boolean = false;
  address1Toggle: boolean = false;
  address2Toggle: boolean = false;
  cityToggle: boolean = false;
  stateToggle: boolean = false;
  countryToggle: boolean = false;
  zipcodeToggle: boolean = false;
  genderList: string[];
  isedit: boolean = false;
  iseditable: boolean = false;
  role: string;
  showField: boolean;
  targetUrl: any;
  likesArray: any = [];
  temp: number;
  isroleActive: boolean;
  categoriesList: any[];
  subcategoriesList: any[];
  cat_id: any = null;
  subcat_id: any = null;
  date = new Date();
  createdbyID: any;
  toggleData: any;
  userTickets: any;
  listOfServices: any = [];
  order: string = "fromDate";
  addOne: boolean;
  provider: string;
  slugExist: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: MyaccountViewService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
    private _lightbox: Lightbox,
    private _chatService: ChatService,
    private eventService: AddEventService,
    private common: CommonService,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.provider = sessionStorage.getItem("provider");
    this.role = sessionStorage.getItem("role");
    this.createdbyID = sessionStorage.getItem("ID");
    this.getAccountDetails();
    // this.getAllCategories();
    this.buildBasicForm();
    this.buildSocialForm();
    this.buildProfessionalForm();
    this.buildAdressForm();
    this.buildLikesForm();
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";

    this.list = true;

    this.getCategories();
    // this.getSubCategories('')

    this.genderList = ["Male", "Female"];

    if (this.role == "Fan") {
      this.artistDetails.controls["slug"].setValidators(null);
      this.addressDetails.controls["state"].setValidators(null);
      this.addressDetails.controls["country"].setValidators(null);
      this.addressDetails.controls["city"].setValidators(null);
      this.artistProfession.controls["category"].setValidators(null);
      this.artistProfession.controls["genre"].setValidators(null);
    }
  }

  public buildBasicForm() {
    this.artistDetails = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl(""),
      dob: new FormControl(""),
      gender: new FormControl("", [Validators.required]),
      slug: new FormControl("", [Validators.required]),
      // email: new FormControl('', [Validators.required,Validators.pattern(this.emailPattern)]),

      phonenumber: new FormControl("", [
        Validators.pattern(this.mobilePattern)
      ]),
      mobilenumber: new FormControl("", [
        Validators.pattern(this.mobilePattern)
      ]),
      fax: new FormControl(""),
      website: new FormControl("", [Validators.pattern(this.websitePattern)])
    });
  }

  public buildAdressForm() {
    this.addressDetails = this.formBuilder.group({
      street2: new FormControl(""),
      state: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      street1: new FormControl(""),
      city: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      country: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      zipcode: new FormControl("", [Validators.pattern("[0-9]+")])
    });
  }

  public buildLikesForm() {
    this.likesForm = this.formBuilder.group({
      categorylike: new FormControl(""),
      subcategorylike: new FormControl("")
    });
  }

  public buildProfessionalForm() {
    this.artistProfession = this.formBuilder.group({
      category: new FormControl("", [Validators.required]),
      sub_genre: new FormControl(""),
      genre: new FormControl("", [Validators.required]),
      schools: new FormControl([]),
      certificates: new FormControl([]),
      achievements: new FormControl([]),
      awards: new FormControl([]),
      talentSynopsis: new FormControl(""),
      trainings: new FormControl([]),
      profile_writeup: new FormControl(""),
      future_performances: new FormControl(""),
      past_performances: new FormControl("")
    });
  }

  public buildSocialForm() {
    this.social = this.formBuilder.group({
      facebook: new FormControl(""),
      twitter: new FormControl(""),
      instagram: new FormControl(""),
      google: new FormControl("")
    });
  }

  public getAccountDetails() {
    this.spinner.show();
    let id = sessionStorage.getItem("ID");
    this.accountService.getMyAccountsDetails(id).subscribe(
      data => {
        this.accountDetails(data);
        // console.log(data);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  private accountDetails(data: any) {
    this.spinner.hide();
    if (data.success) {
      this.selectedCityName = data.details.user.userTemplate;
      this.toggleData = data.details.toggleUserData;
      data.details.user.dob =
        data.details.user.dob == null
          ? this.artistDetails.controls["dob"].reset()
          : new Date(data.details.user.dob);
      this.likesArray = data.details.user.likes;
      this.likesArray = JSON.parse(this.likesArray);
      this.mobileToggle = this.toggleData.mobilenumber;
      this.phoneToggle = this.toggleData.phonenumber;
      this.faxToggle = this.toggleData.fax;
      this.websiteToggle = this.toggleData.website;
      this.dobToggle = this.toggleData.dob;
      this.genderToggle = this.toggleData.gender;
      this.schoolsToggle = this.toggleData.schools;
      this.certificatesToggle = this.toggleData.certificates;
      this.acheivementsToggle = this.toggleData.achievements;
      this.awardsToggle = this.toggleData.awards;
      this.talentSynopsis = this.toggleData.talentSynopsis;
      this.trainingsToggle = this.toggleData.trainings;
      this.futurePerformancesToggle = this.toggleData.future_performances;
      this.pastPerformancesToggle = this.toggleData.past_performances;
      this.facebookToggle = this.toggleData.facebook;
      this.twitterToggle = this.toggleData.twitter;
      this.instagramToggle = this.toggleData.instagram;
      this.googleToggle = this.toggleData.google;
      this.address1Toggle = this.toggleData.street1;
      this.address2Toggle = this.toggleData.street2;
      this.cityToggle = this.toggleData.city;
      this.stateToggle = this.toggleData.state;
      this.countryToggle = this.toggleData.country;
      this.zipcodeToggle = this.toggleData.zipcode;

      if (data.details.events.isArray) {
        data.details.events.map(item => {
          item["fromDate"] =
            item["fromDate"] == "" ? "" : new Date(item["fromDate"]);
          item["endDate"] =
            item["endDate"] == "" ? "" : new Date(item["endDate"]);
        });
      }
      this.eventDetails = this.orderPipe.transform(
        data.details.events,
        this.order
      );
      this.eventDetails.forEach(element => {
        element["url"] = `${environment.domainUrl}` + "/#/events/" + element.id;
      });
      this.imageGallery = data.details.gallery;
      this.listOfVenue = data.details.venues;
      this.listOfServices = data.details.service;
      this.listOfServices.forEach(element => {
        if (element.leadTime !== null) {
          element.leadTime.substring(0, element.leadTime.length - 1).split("-");
          element["leadTimeView"] =
            element.leadTime[0] + " Days, " + element.leadTime[2] + " Hours";
        }
      });
      this.imageGallery.map(element => {
        element["location"] =
          element["location"] == ""
            ? "../../../../assets/images/default.png"
            : element["location"];
        const src = element["location"];
        const caption = element["title"];
        const album = {
          src: src,
          caption: caption
        };

        this._imageAlbums.push(album);
      });
      this.videoGallery = data.details.videos;
      this.userID = data.details.user.id;
      this.isPublic = data.details.user.public_;
      this.accountData = data.details.user;
      this.accountName =
        data.details.user.firstName + " " + data.details.user.lastName;
      this.accountMail = data.details.user.email;
      this.followers = data.details.followers;
      this.following = data.details.following;
      // this.isroleActive = data.details.user.roleActive
      this.profilePicture = data.details.user.profilePic;

      this.profileStatus = data.details.profileCompleteness;

      this.profilePercentage = { width: this.profileStatus + "%" };
      let getAwards = [];
      if (data.details.userOtherdetails.awards !== null) {
        data.details.userOtherdetails.awards.map(item => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getAwards.push(params);
        });
      }
      let getAcheivement = [];
      if (data.details.userOtherdetails.achievements !== null) {
        data.details.userOtherdetails.achievements.map((item: any) => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getAcheivement.push(params);
        });
      }

      data.details.userOtherdetails.awards = getAwards;
      data.details.userOtherdetails.achievements = getAcheivement;

      let getEducation = [];
      if (data.details.userOtherdetails.education !== null) {
        data.details.userOtherdetails.education.map((item: any) => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getEducation.push(params);
        });
      }

      let getCertificates = [];
      if (data.details.userOtherdetails.certificates !== null) {
        data.details.userOtherdetails.certificates.map((item: any) => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getCertificates.push(params);
        });
      }

      let getTrainings = [];
      if (data.details.userOtherdetails.trainings !== null) {
        data.details.userOtherdetails.trainings.map((item: any) => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getTrainings.push(params);
        });
      }

      let getSchools = [];
      if (data.details.userOtherdetails.schools !== null) {
        data.details.userOtherdetails.schools.map((item: any) => {
          let params = {
            display: "",
            value: ""
          };
          params.display = item;
          params.value = item;
          getSchools.push(params);
        });
      }
      if (
        data.details.venues.length !== 0 &&
        data.details.venues !== undefined
      ) {
        data.details.venues.map((item: any) => {
          item.tags = item.tags.substring(1, item.tags.length - 1).split(",");
        });
      }
      data.details.userOtherdetails.certificates = getCertificates;
      data.details.userOtherdetails.trainings = getTrainings;
      data.details.userOtherdetails.schools = getSchools;
      this.artistDetails.patchValue(data.details.user);
      this.artistProfession.patchValue(data.details.userOtherdetails);
      this.social.patchValue(data.details.socialAccounts);
      this.addressDetails.patchValue(data.details.address);
      // this.getCategories();
      this.cat_id = data.details.userOtherdetails.category;
      this.subcat_id = data.details.userOtherdetails.genre;
      let genderIndex = this.genderList
        .map((ele: any) => ele)
        .indexOf(data.details.user.gender);
      this.artistDetails.controls["gender"].patchValue(
        this.genderList[genderIndex]
      );
      this.getAllCategories();
      console.log(data.details);
      console.log(data.details.userTickets);
      this.userTickets = data.details.userTickets;
      this.userTickets.forEach(element => {
        element.ticketInfo = JSON.parse(element.ticketInfo);
        element["totalPrice"] = 0;
        element.bookDate = new Date(element.bookDate);
        element.ticketInfo.forEach(ele => {
          element["totalPrice"] = Math.round(
            parseFloat(element["totalPrice"]) + parseFloat(ele.price)
          );
        });
      });
    }
  }

  public updateAccount() {
    this.spinner.show();

    console.log(this.artistDetails.value.dob);
    this.artistDetails.value.dob = new Date(this.artistDetails.value.dob);
    this.addOne
      ? this.artistDetails.value.dob.setDate(this.artistDetails.value.dob + 1)
      : this.artistDetails.value.dob;
    let achievements = [];
    this.artistProfession.value.achievements.map(item => {
      achievements.push(item["value"]);
    });
    this.artistProfession.value.achievements = achievements;

    let awards = [];
    this.artistProfession.value.awards.map(item => {
      awards.push(item["value"]);
    });
    this.artistProfession.value.awards = awards;

    let certificates = [];
    this.artistProfession.value.certificates.map(item => {
      certificates.push(item["value"]);
    });
    this.artistProfession.value.certificates = certificates;

    let trainings = [];
    this.artistProfession.value.trainings.map(item => {
      trainings.push(item["value"]);
    });
    this.artistProfession.value.trainings = trainings;

    let schools = [];
    this.artistProfession.value.schools.map(item => {
      schools.push(item["value"]);
    });

    this.artistProfession.value.schools = schools;
    if (this.role !== "Fan") {
      Object.assign(this.artistDetails.value, this.artistProfession.value);
    }
    Object.assign(this.artistDetails.value, this.addressDetails.value);
    Object.assign(this.artistDetails.value, this.social.value);
    if (this.role == "Fan") {
      // Object.assign(this.artistDetails.value, this.getlikes());
    }

    this.accountService
      .putUpdateAccount(this.artistDetails.value)
      .subscribe(data => {
        this.updateAccountDetails(data);
      });
  }
  private updateAccountDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.notiService.showSuccess(data.message, "", 4000);
      this.getAccountDetails();
    } else {
      this.notiService.showError(data.message, "", 4000);
    }
  }

  public upload(type: any) {
    let dataParams = {
      type: type
    };

    const confRef = this.modalService.open(UploadComponent, this.modalOption);
    confRef.componentInstance.uploadType = dataParams;

    confRef.result
      .then(result => {
        // console.log(result)
        if (result.success == "yes") {
          if (result.type == "image") {
            this.imageGallery.push(result.data);
            const album = {
              src: result.data.location,
              caption: result.data.title
              //  thumb: thumb
            };
            this._imageAlbums.push(album);
          } else if (result.type == "profile") {
            this.profilePicture = result.data;
          } else if (result.type == "video") {
            this.videoGallery.push(result.data);
          }

          // console.log(this.imageGallery)
        } else if (result == "no") {
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  public editEvent(id: number, type: any) {
    localStorage.setItem("isEdit", type);
    this.router.navigate(["create_event", id]);
  }

  public createEvent() {
    localStorage.setItem("isEdit", "true");
    this.router.navigate(["create_event"]);
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._imageAlbums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  public deleteService(data, type, index) {
    let confRef = this.modalService.open(
      PromptModalComponent,
      this.modalOption
    );
    confRef.componentInstance.bindContentType = "Delete";
    confRef.result.then(result => {
      if (result == "Yes") {
        this.spinner.show();
        let params = {
          itemId: data.id,
          itemType: type
        };

        this.accountService.delete(params).subscribe(data => {
          this.spinner.hide();
          // console.log(data)
          // this.deletedDetails(data, type)

          if (data["success"]) {
            if (type == "picture") {
              this.imageGallery = data["details"]["gallery"];
            } else if (type == "video") {
              this.videoGallery = data["details"]["videos"];
            }

            this.notiService.showSuccess(data["message"], "", 4000);
          } else {
            this.notiService.showError(data["message"], "", 4000);
          }
        });
      } else {
        return;
      }
    });
  }

  makePublicOrPrivate(id: number, isPublic: boolean, event: string) {
    let data = isPublic == true ? "private" : "public";
    let params = {
      action: data,
      itemId: id,
      itemType: event
    };
    // console.log(params);
    this.accountService.makePublicOrPrivate(params).subscribe(response => {
      // console.log(JSON.stringify(response));
      if (response["success"]) {
        this.notiService.showSuccess(response["message"], "", 4000);
        this.videoGallery = response["details"]["videos"];
        this.imageGallery = response["details"]["gallery"];
        this.eventDetails = response["details"]["events"];
        this.getAccountDetails();
      } else {
        this.notiService.showError(response["message"], "", 4000);
      }
    });
  }

  makePublishOrUnpublish(id: number, isPublish: boolean) {
    let data = isPublish == true ? "unpublish" : "publish";
    let params = {
      action: data,
      itemId: id,
      itemType: "event"
    };
    // console.log(params);
    this.accountService.makePublicOrPrivate(params).subscribe(response => {
      // console.log(JSON.stringify(response));
      if (response["success"]) {
        this.notiService.showSuccess(response["message"], "", 4000);
        this.eventDetails = response["details"]["events"];
      } else {
        this.notiService.showError(response["message"], "", 4000);
      }
    });
  }

  deleteEvent(id: number, isDelete: boolean) {
    let confRef = this.modalService.open(
      PromptModalComponent,
      this.modalOption
    );
    confRef.componentInstance.bindContentType = isDelete ? "Delete" : "Cancel";
    confRef.result
      .then(result => {
        // console.log(result)
        if (result == "Yes") {
          this.accountService.deleteItem(id).subscribe(response => {
            // console.log(JSON.stringify(response));
            if (response["success"]) {
              this.notiService.showSuccess(response["message"], "", 4000);
              this.eventDetails = response["details"]["events"];
            } else {
              this.notiService.showError(response["message"], "", 4000);
            }
          });
        } else {
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  public artistDetailPage(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["artists", id]);
  }

  public showVideo(data) {
    // console.log(data)
    let dataParams = {
      data: data
    };

    const confRef = this.modalService.open(
      VideoViewModalComponent,
      this.modalOption
    );
    confRef.componentInstance.videoData = dataParams;

    confRef.result
      .then(result => {
        // console.log(result)
        if (result.success == "yes") {
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  public changePassword() {
    // if (sessionStorage.getItem("provider") !== "zeatr") {
    this.router.navigate(["myaccount/change"]);
    // } else {
    //   this.notiService.showError(
    //     "Please Look into Your Current Password in " +
    //       sessionStorage.getItem("provider") +
    //       " and Change it Accordingly",
    //     "",
    //     4000
    //   );
    // }
    // const confRef = this.modalService.open(ChangePasswordComponent, this.modalOption);
    // confRef.result.then((result) => {
    //   // console.log(result)
    //   if (result == 'yes') {
    //   }
    // }).catch((error) => {
    //   // console.log(error);
    // });
  }

  public switchToggle(fieldName) {
    let params = {
      itemType: fieldName
    };
    this.accountService.toggleSwitch(params).subscribe(response => {
      if (response["success"]) {
        this.notiService.showSuccess(response["message"], "", 4000);
      } else {
        this.notiService.showError(response["message"], "", 4000);
      }
    });
  }

  public chatJoin(data) {
    // console.log(data)
    sessionStorage.setItem("ChatGroupId", data.groups[0].id);
    //this.openChat()
    const param = {
      emailId: sessionStorage.getItem("emailId"),
      eventId: data.id,
      groupId: parseInt(sessionStorage.getItem("ChatGroupId"))
    };
    this._chatService.join(param).subscribe(
      resp => {
        this.joinChatDetails(resp, param);
      },
      error => {}
    );
  }

  private joinChatDetails(data, param) {
    console.log(data);

    // console.log(resp)
    data.eventGroupMessageList.map(item => {
      // data.map(item => {
      if (item["emailId"] === param.emailId) {
        item["isMe"] = true;
      } else {
        item["isMe"] = false;
      }
    });
    this.openChat(data);
    // this.openChat(data)
    // console.log(resp)
  }

  public openChat(data) {
    const confRef = this.modalService.open(ChatComponent, this.modalOption);
    confRef.componentInstance.chatData = data;
    confRef.result
      .then(result => {
        // console.log(result)
        if (result == "yes") {
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  public addVenue() {
    const confRef = this.modalService.open(
      AddVenueModalComponent,
      this.modalOption
    );
    confRef.componentInstance.setData = { value: "Create", data: null };
    confRef.result
      .then(response => {
        // console.log(response)
        response["owner"] = response.url == "/myaccount" ? true : false;
        let params = response;
        // console.log(JSON.stringify(params))
        this.accountService.postVenue(params).subscribe((data: any) => {
          if (data.success) {
            this.notiService.showSuccess(data.message, "", 4000);
            this.getAccountDetails();
          } else {
            this.notiService.showError(data.message, "", 4000);
          }
        });
      })
      .catch(error => {
        // console.log(error);
      });
  }

  public makePublicOrPrivateVenue(id) {
    let params = {};
    this.accountService
      .makePublicOrPrivateVenue(id, params)
      .subscribe((data: any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.getAccountDetails();
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      });
  }

  public updateVenue(i: number) {
    this.isedit = true;
    const confRef = this.modalService.open(
      AddVenueModalComponent,
      this.modalOption
    );
    confRef.componentInstance.setData = {
      value: "Update",
      data: this.listOfVenue[i]
    };
    confRef.result
      .then(response => {
        let params = response;
        let id = this.listOfVenue[i].id;
        this.accountService.updateVenue(id, params).subscribe((data: any) => {
          if (data.success) {
            this.notiService.showSuccess(data.message, "", 4000);
            this.getAccountDetails();
            this.isedit = false;
          } else {
            this.notiService.showError(data.message, "", 4000);
          }
        });
      })
      .catch(obj => {
        let attributes = [];
        obj.value.tags.map(item => {
          attributes.push(item["value"]);
        });
        this.isedit = false;
        this.listOfVenue[i].tags = attributes;
      });
  }

  public setTargetUrl() {
    if (this.slugExist == false) {
      let val = this.artistDetails.controls["slug"].value;
      this.showField = this.artistDetails.controls["slug"].valid ? false : true;
      this.targetUrl =
        val.startsWith("http://") || val.startsWith("https://")
          ? val
          : "http://" + val;
    }
  }

  checkSlug() {
    let slug = this.artistDetails.controls["slug"].value;
    this.accountService.checkSlug(slug).subscribe((res: any) => {
      if (!res.success) {
        this.slugExist = false;
      } else {
        this.slugExist = true;
      }
    });
  }

  hasTask(date: NgbDateStruct) {
    return this.dateHasTask(date);
  }

  dateHasTask(date: NgbDateStruct): boolean {
    if (this.eventDetails !== undefined) {
      for (var i = 0; i < this.eventDetails.length; i++) {
        let CurrentDate = new Date(this.eventDetails[i].fromDate);
        while (CurrentDate <= new Date(this.eventDetails[i].endDate)) {
          var taskDate = CurrentDate;
          var day: number = taskDate.getDate();
          var month: number = taskDate.getMonth() + 1;
          var year: number = taskDate.getFullYear();
          CurrentDate.setDate(CurrentDate.getDate() + 1);
          if (day === date.day && month === date.month && year === date.year) {
            return true;
          }
        }
      }
    }
  }

  /**
   * @author Reshma
   * getCategories function is used to get all Categories
   * params{}
   */

  public getCategories() {
    this.categories = [];
    this.spinner.show();
    this.accountService.getcategories().subscribe((data: any) => {
      this.spinner.hide();
      this.temp = 1;
      data.map((item: any, index: Number) => {
        item["isSelected"] = false;
        this.categories.push(item);
        this.getSubcategoriesList(item, index, data.length);
      });
    });
  }

  /**
   * @author Reshma
   * getSubcategoriesList function is used to get all Sub Categories of all categories
   * params{ category }
   */

  public getSubcategoriesList(category, index, length) {
    this.categories[index]["subCategores"] = [];
    this.accountService.getsubcategories(category.id).subscribe((data: any) => {
      data.map((item: any) => {
        item["isSelected"] = false;
        this.categories[index]["subCategores"].push(item);
        if (this.temp == length) this.setLikes();
      });
      this.temp = this.temp + 1;
    });
  }

  public getSelectedAll(parentDivID) {
    let idx = this.categories.findIndex(i => i.category === parentDivID);
    this.categories[idx].isSelected = !this.categories[idx].isSelected;
    this.categories[idx].subCategores.forEach(element => {
      element.isSelected = this.categories[idx].isSelected ? true : false;
    });
  }

  public getSelectedOne(parentDivID, childDivID) {
    let idx = this.categories.findIndex(i => i.category === parentDivID);
    let idx1 = this.categories[idx].subCategores.findIndex(
      i => i.subcategory == childDivID
    );
    this.categories[idx].subCategores[idx1].isSelected = !this.categories[idx]
      .subCategores[idx1].isSelected;
    let count = 0;
    this.categories[idx].subCategores.forEach(element => {
      if (element.isSelected) {
        count = count + 1;
      }
    });
    if (count == this.categories[idx].subCategores.length)
      this.categories[idx].isSelected = true;
    else this.categories[idx].isSelected = false;
  }

  public getlikes() {
    this.likesArray = [];
    this.categories.forEach((element, index) => {
      this.likesArray.push({
        item: element.category,
        value: element.isSelected
      });
      this.likesArray[index]["subItem"] = [];
      element.subCategores.forEach(ele => {
        if (ele.isSelected)
          this.likesArray[index]["subItem"].push({
            item: ele.subcategory,
            value: ele.isSelected
          });
      });
    });
    return { likes: JSON.stringify(this.likesArray) };
  }

  public setLikes() {
    if (
      this.likesArray !== undefined &&
      this.likesArray !== null &&
      this.likesArray.length !== 0
    ) {
      this.categories.forEach(element => {
        let idx = this.likesArray.findIndex(i => i.item === element.category);
        element.isSelected = this.likesArray[idx].value ? true : false;
        if (element.subCategores !== undefined) {
          element.subCategores.forEach(ele => {
            let idx1 = this.likesArray[idx]["subItem"].findIndex(
              i => i.item === ele.subcategory
            );
            if (idx1 !== -1) {
              ele.isSelected = this.likesArray[idx]["subItem"][idx1].value
                ? true
                : false;
            }
          });
        }
      });
    }
  }

  hasPublicTask(date: NgbDateStruct) {
    return this.datePublicHasTask(date);
  }

  datePublicHasTask(date: NgbDateStruct): boolean {
    if (this.eventDetails !== undefined) {
      for (var i = 0; i < this.eventDetails.length; i++) {
        let CurrentDate = new Date(this.eventDetails[i].fromDate);
        while (CurrentDate <= new Date(this.eventDetails[i].endDate)) {
          var taskDate = CurrentDate;
          var day: number = taskDate.getDate();
          var month: number = taskDate.getMonth() + 1;
          var year: number = taskDate.getFullYear();
          CurrentDate.setDate(CurrentDate.getDate() + 1);
          if (
            day === date.day &&
            month === date.month &&
            year === date.year &&
            this.eventDetails[i]._public
          ) {
            // console.log('PUBLIC EVENT...'+this.eventDetails[i].name)
            date["name"] = this.eventDetails[i].name;
            return true;
          }
        }
      }
    }
  }

  hasPrivateTask(date: NgbDateStruct) {
    return this.datePrivateHasTask(date);
  }

  datePrivateHasTask(date: NgbDateStruct): boolean {
    if (this.eventDetails !== undefined) {
      for (var i = 0; i < this.eventDetails.length; i++) {
        let CurrentDate = new Date(this.eventDetails[i].fromDate);
        while (CurrentDate <= new Date(this.eventDetails[i].endDate)) {
          var taskDate = CurrentDate;
          var day: number = taskDate.getDate();
          var month: number = taskDate.getMonth() + 1;
          var year: number = taskDate.getFullYear();
          CurrentDate.setDate(CurrentDate.getDate() + 1);
          if (
            day === date.day &&
            month === date.month &&
            year === date.year &&
            !this.eventDetails[i]._public
          ) {
            // console.log('PRIVATE EVENT...'+this.eventDetails[i].name)
            date["name"] = this.eventDetails[i].name;
            return true;
          }
        }
      }
    }
  }

  public requestRole() {
    // this.accountService.requestRole().subscribe(data=>{
    //   if(data.success){
    //     this.notiService.showSuccess(data.message,'',4000);
    //     this.getAccountDetails();
    //   }else{
    //     this.notiService.showError(data.message,'',4000)
    //   }
    // })
  }

  public getAllCategories() {
    this.spinner.show();
    let arr = [];
    this.accountService.getcategories().subscribe((data: any) => {
      this.spinner.hide();
      data.map((item: any, index: Number) => {
        arr.push(item);
      });
      this.categoriesList = arr;
      if (
        this.cat_id !== null &&
        this.cat_id !== undefined &&
        this.cat_id !== ""
      ) {
        let categoriesIndex = this.categoriesList
          .map((el: any) => el.id)
          .indexOf(this.cat_id);
        if (categoriesIndex !== -1) {
          this.artistProfession.controls["category"].patchValue(
            this.categories[categoriesIndex]
          );
          this.getSubCategoriesbasedoncatid(this.categories[categoriesIndex]);
        }
      }
    });
  }

  public getSubCategoriesbasedoncatid(category) {
    this.spinner.show();
    let arr = [];
    this.accountService.getsubcategories(category.id).subscribe((data: any) => {
      this.spinner.hide();
      data.map((item: any) => {
        arr.push(item);
      });
      this.subcategoriesList = arr;
      if (
        this.subcat_id !== null &&
        this.subcat_id !== undefined &&
        this.subcat_id !== ""
      ) {
        let subcategoriesIndex = this.subcategoriesList
          .map((el: any) => el.id)
          .indexOf(this.subcat_id);
        this.artistProfession.controls["genre"].patchValue(
          this.subcategoriesList[subcategoriesIndex]
        );
      }
    });
  }

  public openFollowers() {
    this.router.navigate(["myaccount/followers"]);
  }

  public openEventFollowers(id: any) {
    this.router.navigate(["myaccount/eventfollowers", id]);
  }

  public openFollowing() {
    this.router.navigate(["myaccount/following"]);
  }

  public onThemeChange(event) {
    this.spinner.show();
    let params = this.selectedCityName;

    this.accountService.userTemplate(params).subscribe(data => {
      console.log(data);
      this.userTemplateDetails(data);
    });
  }

  private userTemplateDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.notiService.showSuccess(data.message, "", 4000);
    }
  }
  public cancelBooking(data) {
    console.log(data);
    let list = [];
    data.ticketInfo.forEach(element => {
      list.push({
        id: element.id,
        totalCancelledTickets: element.totalBuyedTickets
      });
    });
    let params = {
      userTicketId: data.id,
      eventId: data.events.id,
      buyedTicketsList: list,
      bookingId: data.uniqueId
    };

    this.accountService.cancelBooking(params).subscribe((data: any) => {
      if (data.success) {
        this.notiService.showSuccess(data.message, "", 4000);
        this.getAccountDetails();
      } else {
        this.notiService.showError(data.message, "", 4000);
      }
    });
  }

  hasBookingDate(date: NgbDateStruct) {
    return this._hasBookingDate(date);
  }

  _hasBookingDate(date: NgbDateStruct): boolean {
    if (this.userTickets !== undefined && this.userTickets.length !== 0) {
      for (let i = 0; i < this.userTickets.length; i++) {
        let CurrentDate = new Date(this.userTickets[i].bookDate);
        var taskDate = CurrentDate;
        var day: number = taskDate.getDate();
        var month: number = taskDate.getMonth() + 1;
        var year: number = taskDate.getFullYear();
        if (day === date.day && month === date.month && year === date.year) {
          return true;
        }
      }
    }
  }

  public addService() {
    const confRef = this.modalService.open(ServiceComponent, this.modalOption);
    confRef.componentInstance.setData = { value: "Create", data: null };
    confRef.result
      .then(response => {
        console.log(response);
        let params = response;

        // params.leadTime.substring(0, params.leadTime.length - 1).split("-");
        // console.log(params.leadTime);
        // params.leadTime =
        //   params.leadTime[0] + " Days, " + params.leadTime[2] + " Hours";
        // this.listOfServices.push(params);
        console.log(JSON.stringify(params));
        this.accountService.postService(params).subscribe((data: any) => {
          if (data.success) {
            this.notiService.showSuccess(data.message, "", 4000);
            this.getAccountDetails();
          } else {
            this.notiService.showError(data.message, "", 4000);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  public updateService(i: number) {
    const confRef = this.modalService.open(ServiceComponent, this.modalOption);
    confRef.componentInstance.setData = {
      value: "Update",
      data: this.listOfServices[i]
    };
    confRef.result
      .then(response => {
        let params = response;
        params["id"] = this.listOfServices[i].id;
        // let id = this.listOfServices[i].id;
        // this.listOfServices[i] = params;
        // this.listOfServices[i].leadTime
        //   .substring(0, this.listOfServices[i].leadTime.length - 1)
        //   .split("-");
        // console.log(this.listOfServices[i].leadTime);
        // this.listOfServices[i].leadTime =
        //   this.listOfServices[i].leadTime[0] +
        //   " Days, " +
        //   this.listOfServices[i].leadTime[2] +
        //   " Hours";
        this.accountService.postService(params).subscribe((data: any) => {
          if (data.success) {
            this.notiService.showSuccess(data.message, "", 4000);
            this.getAccountDetails();
          } else {
            this.notiService.showError(data.message, "", 4000);
          }
        });
      })
      .catch(obj => {
        console.log(obj);
      });
  }
  makePublicOrPrivate_Service(id) {
    let params = {};
    this.accountService
      .makePublicOrPrivate_Service(id, params)
      .subscribe((data: any) => {
        if (data.success) {
          this.notiService.showSuccess(data.message, "", 4000);
          this.getAccountDetails();
        } else {
          this.notiService.showError(data.message, "", 4000);
        }
      });
  }

  delService(id) {
    this.accountService.delService(id).subscribe((data: any) => {
      if (data.success) {
        this.notiService.showSuccess(data.message, "", 4000);
        this.getAccountDetails();
      } else if (!data.success) {
        this.notiService.showError(data.message, "", 4000);
        this.getAccountDetails();
      } else {
        this.notiService.showError(data.message, "", 4000);
      }
    });
  }

  routeToEvents(id) {
    localStorage.setItem("source", this.router.url);
    this.router.navigate(["events", id]);
  }

  dateChange() {
    this.addOne = true;
  }

  websiteValidator(control: AbstractControl): ValidationErrors{
    // console.log('hello' , this.artistDetails.controls['website'])
    if (control.value !== null) {
      if (control.value.indexOf(".") !== -1) {
        if (control.value.split(".")[1].length > 2) {
          return { value1: true };
        } else {
          return { value1: false };
        }
      } else {
        return { value1: false };
      }
    }
    return null;
  }
}
