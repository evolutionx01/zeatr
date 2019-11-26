import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import {
  NgbModal,
  NgbDateStruct,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModalOptions,
  NgbCarouselConfig
} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { AddEventService } from "./add-event.service";
import { ToasterNotiService } from "../../../shared/services/notification/toaster-noti.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { AddEventModalComponent } from "../add-event-modal/add-event-modal.component";
import { AddVenueModalComponent } from "../add-venue-modal/add-venue-modal.component";
import { PromptModalComponent } from "../../myaccount/prompt-modal/prompt-modal.component";
import { FaqModalComponent } from "../faq-modal/faq-modal.component";
import { CommonService } from "src/app/shared/common/common.service";
import { UploadService } from "../../myaccount/upload/upload.service";
@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"],
  providers: [
    DatePipe,
    NgbCarouselConfig,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class AddEventComponent implements OnInit {
  @ViewChild("basicFormVariable") basicFormVariable: FormGroupDirective;

  public modalOption: NgbModalOptions = {};
  public eventEdit: boolean;
  public editId: any;
  public fileList: any;
  public image: any;
  public pData: any;
  editing = {};
  public programForm: FormGroup;
  public basicForm: FormGroup;
  public ticketForm: FormGroup;
  public dataProgram = {
    programs: []
  };

  public dataTicket = {
    tickets: []
  };

  public createButton: string;

  autocompleteVenueAsObjects = [];
  autocompleteArtistAsObjects = [];
  autocompleteServiceAsObjects = [];
  public showZone: boolean = false;

  summed: number;
  showField: boolean = true;

  onlineticketsummed: number;
  targetUrl: string;
  edit: boolean;
  isSuitableForKids: any;
  fileName: any = "No File Chosen";
  file: any = null;
  exists: boolean = false;
  // ticketSum : number = 0;
  get formDataProgram() {
    return <FormArray>this.basicForm.get("programs");
  }
  get formDataTicket() {
    return <FormArray>this.basicForm.get("tickets");
  }

  constructor(
    private formBuilder: FormBuilder,
    private addEventService: AddEventService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    private common: CommonService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.image = "";
    // this.getVenueSearchData();
    // this.getArtistSearchData();
    // this.getServiceSearchData();
    this.buildBasicFrom();
    this.setHasTicketValidation();
    this.setTickets();
    this.setProgram();
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.size = "lg";

    this.activatedRoute.params.subscribe(data => {
      console.log(data);
      if (data.id) {
        this.createButton = "Update";
        this.editId = data.id;
        this.eventEdit = true;
        this.getEventEditDetails(this.editId);
      } else {
        this.createButton = "Create";
        console.log("no");
        this.editId = "";
        this.eventEdit = false;
      }
      this.edit = localStorage.getItem("isEdit") == "true" ? true : false;
    });

    this.basicForm.get("tickets").valueChanges.subscribe(values => {
      this.summed = 0;
      this.onlineticketsummed = 0;
      const ctrl = <FormArray>this.basicForm.controls["tickets"];
      ctrl.controls.forEach(x => {
        let parsed = parseInt(x.get("total").value);
        let onlineTicketparsed = parseInt(x.get("online").value);
        parsed = parsed || 0;
        onlineTicketparsed = onlineTicketparsed || 0;
        this.summed += parsed;
        this.onlineticketsummed += onlineTicketparsed;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  // ngAfterViewInit(){
  //   console.log('view loaded');
  //   this.basicForm.disable();
  // }
  public pad(n, width) {
    n = n + "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join("0") + n;
  }

  public getVenueSearchData(val) {
    val = val.target.value;
    this.addEventService.getVenue().subscribe(data => {
      console.log(data);
      this.venueSearchDetails(data, val);
    });
  }

  private venueSearchDetails(data, val) {
    this.autocompleteVenueAsObjects = [];
    if (data.success) {
      data.details.map(item => {
        let dataId = this.pad(item["id"], 4);
        item["dispaly"] = item["name"] + " " + "(#" + dataId + ")";
        item["value"] = item["name"] + " " + "(#" + dataId + ")";
        let params = {
          display: "",
          value: ""
        };
        params.display = item["dispaly"];
        params.value = item["value"];
        // this.autocompleteVenueAsObjects.push(params);
        if (params.value.toLowerCase().startsWith(val.toLowerCase()))
          this.autocompleteVenueAsObjects.push(params);
      });
    }
  }

  public getArtistSearchData(val) {
    val = val.target.value;
    this.addEventService.getArtist().subscribe(data => {
      console.log(data);
      this.artistSearchDetails(data, val);
    });
  }

  private artistSearchDetails(data, val) {
    this.autocompleteArtistAsObjects = [];
    if (data.success) {
      data.details.map(item => {
        item["name"] = item["firstName"] + " " + item["lastName"];
        let dataId = this.pad(item["id"], 4);
        item["dispaly"] = item["name"] + " " + "(#" + dataId + ")";
        item["value"] = item["name"] + " " + "(#" + dataId + ")";
        let params = {
          display: "",
          value: ""
        };
        params.display = item["dispaly"];
        params.value = item["value"];
        // this.autocompleteArtistAsObjects.push(params);
        if (params.value.toLowerCase().startsWith(val.toLowerCase()))
          this.autocompleteArtistAsObjects.push(params);
      });
    }
  }

  public getServiceSearchData(val) {
    val = val.target.value;
    this.addEventService.getService().subscribe(data => {
      console.log(data);
      this.serviceSearchDetails(data, val);
    });
  }

  private serviceSearchDetails(data, val) {
    this.autocompleteServiceAsObjects = [];
    if (data.success) {
      data.details.map(item => {
        let dataId = this.pad(item["id"], 4);
        item["dispaly"] = item["name"] + " " + "(#" + dataId + ")";
        item["value"] = item["name"] + " " + "(#" + dataId + ")";
        let params = {
          display: "",
          value: ""
        };
        params.display = item["dispaly"];
        params.value = item["value"];
        console.log(params);
        console.log(this.dataProgram.programs);
        // this.autocompleteServiceAsObjects.push(params);
        if (params.value.toLowerCase().startsWith(val.toLowerCase()))
          this.autocompleteServiceAsObjects.push(params);
      });
    }
  }

  public getEventEditDetails(id) {
    this.spinner.show();
    this.addEventService.editEvent(id).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.notiService.showSuccess(data.message, "", 4000);
        this.eventEditDetails(data);
      } else {
        this.notiService.showError(data.message, "", 4000);
      }
    });
  }

  private eventEditDetails(data) {
    if (data.success) {
      console.log(data);
      this.image = data.details.eventVO.picture;
      this.file = data.details.eventVO.brochureLocation;
      if (this.file !== null) {
        let arr = this.file.split("-");
        this.fileName = arr[arr.length - 1];
      }
      this.showField = false;
      console.log(this.image);

      data.details.eventVO.programs.map(item => {
        item["venues"].map(data => {
          data["display"] = data["value"];
        });

        item["artists"].map(data => {
          data["display"] = data["value"];
        });

        item["services"].map(data => {
          data["display"] = data["value"];
        });

        item["endDate"] = new Date(item["endDate"]);
        item["startDate"] = new Date(item["startDate"]);
      });

      data.details.eventVO.hasTicket =
        data.details.eventVO.tickets.length == 0 ? false : true;

      this.showZone = data.details.eventVO.tickets.length == 0 ? false : true;

      data.details.eventVO.programs.map(item => {
        item["dateTime"] = [];
        item["dateTime"][0] = new Date(item["startDate"]);
        item["dateTime"][1] = new Date(item["endDate"]);
        delete item["startDate"];
        delete item["endDate"];
      });

      console.log(data.details.eventVO);

      this.basicForm.patchValue(data.details.eventVO);
      // this.basicForm.patchValue({programs: data.details.eventVO.programs})
      // this.basicForm.patchValue({tickets: data.details.eventVO.tickets})

      console.log(this.basicForm.value);

      this.dataProgram.programs = data.details.eventVO.programs;
      this.dataTicket.tickets = data.details.eventVO.tickets;
      this.setHasTicketValidation();
      this.setTickets();
      this.setProgram();
      console.log("data......" + this.edit);
      if (!this.edit) {
        console.log("disbale");
        this.basicForm.disable();
      } else {
        this.basicForm.enable();
      }
      this.spinner.hide();
    }
  }

  public setHasTicketValidation() {
    const totalTicketControl = this.basicForm.get("totalTickets");
    const onlineTicketControl = this.basicForm.get("onlineTickets");
    const ticketsControl = this.basicForm.get("tickets");

    this.basicForm.get("hasTicket").valueChanges.subscribe(hasTicket => {
      if (hasTicket) {
        totalTicketControl.setValidators([Validators.required]);
        onlineTicketControl.setValidators([Validators.required]);
        ticketsControl.setValidators([Validators.required]);
      } else {
        totalTicketControl.setValidators(null);
        onlineTicketControl.setValidators(null);
        ticketsControl.setValidators(null);
      }
      totalTicketControl.updateValueAndValidity();
      onlineTicketControl.updateValueAndValidity();
      ticketsControl.updateValueAndValidity();
    });
    console.log("DONE1");
  }

  public buildBasicFrom() {
    this.basicForm = this.formBuilder.group(
      {
        name: new FormControl("", [Validators.required]),
        slug: new FormControl("", [Validators.required]),
        summary: new FormControl("", [Validators.required]),
        kidsSuitable: new FormControl(""),
        hasTicket: new FormControl(true),
        totalTickets: new FormControl("", [Validators.required]),
        onlineTickets: new FormControl(""),
        tickets: this.formBuilder.array([], [Validators.required]),
        programs: this.formBuilder.array([], Validators.required)
      },
      {
        validator: this.ticketValidation
      }
    );
  }

  public ticketValidation(c: AbstractControl): any {
    if (c.get("totalTickets").value < c.get("onlineTickets").value) {
      c.get("onlineTickets").setErrors({ matchTicket: true });
    }
  }

  setTickets() {
    let control = <FormArray>this.basicForm.controls.tickets;
    this.dataTicket.tickets.forEach(x => {
      control.push(
        this.formBuilder.group({
          zone: x.zone,
          total: x.total,
          online: x.online,
          priceAdult: x.priceAdult,
          priceOku: x.priceOku,
          priceChild: x.priceChild,
          zonewisecheckbox:
            x.online !== "" && x.online !== null && x.online !== 0
              ? true
              : false
        })
      );
    });
    console.log("DONE2");
  }

  addTickets() {
    console.log("isCHecking....");
    if (this.basicForm.controls.totalTickets.valid) {
      this.showZone = true;
      let control = <FormArray>this.basicForm.controls.tickets;
      control.push(
        this.formBuilder.group(
          {
            //['', Validators.pattern(this.specialCharacter)]
            zone: ["", Validators.required],
            total: ["", Validators.required],
            online: [""],
            priceAdult: ["", Validators.required],
            priceOku: ["", Validators.required],
            priceChild: [
              "",
              this.isSuitableForKids ? Validators.required : null
            ],
            zonewisecheckbox: [null]
          },
          {
            validator: this.ZoneTicketValidation.bind(this)
          }
        )
      );
    } else {
      this.basicForm.controls.totalTickets.markAsTouched({ onlySelf: true });
    }
  }

  public ZoneTicketValidation(c: AbstractControl): any {
    c.get("zonewisecheckbox").valueChanges.subscribe(ischanged => {
      if (ischanged && c.get("zonewisecheckbox").value) {
        c.get("online").setValidators([Validators.required]);
      } else {
        c.get("online").setValidators(null);
      }
      c.get("online").updateValueAndValidity();
    });
    let ctrls = this.basicForm.controls;

    if (c.get("total").value < c.get("online").value) {
      c.get("online").setErrors({ matchZoneTicket: true });
    }
    if (
      ctrls.totalTickets.value < c.get("total").value ||
      this.summed > ctrls.totalTickets.value
    ) {
      c.get("total").setErrors({ matchZoneTotalTicket: true });
    }
    if (
      ctrls.onlineTickets.value < c.get("online").value ||
      this.onlineticketsummed > ctrls.onlineTickets.value
    ) {
      c.get("online").setErrors({ matchZoneOnlineTicket: true });
    }
  }

  deleteTicket(index: number) {
    let control = <FormArray>this.basicForm.controls.tickets;
    control.removeAt(index);
    console.log(control.length);
    this.showZone = control.length == 0 ? false : true;
  }

  setProgram() {
    let control = <FormArray>this.basicForm.controls.programs;
    this.dataProgram.programs.forEach(x => {
      control.push(
        this.formBuilder.group({
          name: x.name,
          venues: this.setVenues(x),
          artists: this.setArtists(x),
          services: this.setServices(x),
          dateTime: this.setDate(x),
          // startDate: x.startDate,
          // endDate: x.endDate,
          shortNote: x.shortNote,
          longNote: x.longNote,
          mcNote: x.mcNote
        })
      );
    });
  }

  setVenues(x) {
    let arr = [];
    arr[0] = x.venues;
    return arr;
  }
  setArtists(x) {
    let arr = [];
    arr[0] = x.artists;
    return arr;
  }

  setServices(x) {
    let arr = [];
    arr[0] = x.services;
    return arr;
  }

  setDate(x) {
    let arr = [];
    arr[0] = x.dateTime;
    return arr;
  }

  addProgram() {
    let control = <FormArray>this.basicForm.controls.programs;
    control.push(
      this.formBuilder.group({
        //['', Validators.pattern(this.specialCharacter)]
        name: ["", Validators.required],
        venues: [[], Validators.required],
        artists: [[], Validators.required],
        services: [[]],
        dateTime: [
          [],
          { validators: [Validators.required, this.DateTimeValidator] }
        ],
        // startDate: ['', { validators: [Validators.required, ] }],
        // endDate: ['', { validators: [Validators.required, this.DateTimeValidator] }],
        shortNote: "",
        longNote: "",
        mcNote: ""
      })
    );
  }

  public startEndDateValidator(c: AbstractControl): any {
    if (c.get("startDate").value < c.get("endDate").value) {
      c.get("online").setErrors({ matchDate: true });
    }
  }

  public DateTimeValidator = (fc: FormControl) => {
    console.log(fc.value);
    if (fc.value[0] == null || fc.value[1] == null) {
      return {
        isValid: {
          valid: false
        }
      };
    } else {
      const startDate = new Date(fc.value[0]);
      const endDate = new Date(fc.value[1]);
      const isValidStart = !isNaN(startDate.valueOf());
      const isValidEnd = !isNaN(endDate.valueOf());

      if (isValidStart && isValidEnd) {
        return null;
      } else {
        return {
          isValid: {
            valid: false
          }
        };
      }
    }
  };

  public deleteProgram(index) {
    let confRef = this.modalService.open(
      PromptModalComponent,
      this.modalOption
    );
    confRef.componentInstance.bindContentType = "Delete";
    confRef.result
      .then(result => {
        if (result == "Yes") {
          let control = <FormArray>this.basicForm.controls.programs;
          control.removeAt(index);
        } else {
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateValue(event, cell, rowIndex) {
    console.log(this.editing);

    if (event.target.value.trim() == "" || event.target.value == "") {
      this.editing[rowIndex + "-" + cell] = false;
    } else {
      this.editing[rowIndex + "-" + cell] = true;
      this.pData[rowIndex][cell] = event.target.value;
    }

    console.log(this.pData);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
    let postParams = new FormData();
    postParams.append("file", file, file.name);
    this.spinner.show();
    this.uploadService.uploadImage(postParams).subscribe(
      data => {
        this.spinner.hide();
        this.image = data["details"].location;
      },
      error => {
        this.spinner.hide();
        this.notiService.showError(error, "", 4000);
      }
    );
  }

  public create() {
    console.log(this.basicForm.value);
    this.spinner.show();

    this.basicForm.value.programs.map(data => {
      data["startDate"] = data["dateTime"][0];
      data["endDate"] = data["dateTime"][1];
      delete data["dateTime"];
    });

    console.log(this.image);

    if (!this.basicForm.value.hasTicket) {
      this.basicForm.value.tickets = [];
    }

    // postParams.append('programs', this.programForm.value.programs);
    this.basicForm.value.programs.map(item => {
      item["venues"].map(data => {
        delete data["display"];
      });
    });

    this.basicForm.value.programs.map(item => {
      item["artists"].map(data => {
        delete data["display"];
      });
    });

    this.basicForm.value.programs.map(item => {
      item["services"].map(data => {
        delete data["display"];
      });
    });

    delete this.basicForm.value.hasTicket;

    this.basicForm.value.id = this.editId != "" ? this.editId : "";
    this.basicForm.value.picture = this.image;
    this.basicForm.value.brochureLocation = this.file;
    console.log(this.basicForm.value);

    this.addEventService.createEvent(this.basicForm.value).subscribe(
      data => {
        console.log(data);
        this.createEventDetails(data);
      },
      error => {
        this.notiService.showError(error, "", 4000);
        this.spinner.hide();
        this.router.navigate(["myaccount"]);
      }
    );
  }

  private createEventDetails(data) {
    this.spinner.hide();
    if (data.success) {
      this.notiService.showSuccess(data.message, "", 4000);
      this.router.navigate(["myaccount"]);
    } else {
      this.notiService.showError(data.message, "", 4000);
      this.spinner.hide();
      this.router.navigate(["myaccount"]);
    }
  }

  search(type, index) {
    const control = this.basicForm.get([
      "programs",
      index,
      type
    ]) as FormControl;
    console.log(index);

    let dataParams = {
      type: type,
      array: control.value
    };

    const confRef = this.modalService.open(
      AddEventModalComponent,
      this.modalOption
    );
    confRef.componentInstance.searchType = dataParams;

    confRef.result
      .then(result => {
        console.log(result);
        if (result.success == "yes") {
          console.log(result);

          let params = {
            display: "",
            value: ""
          };

          params.display = result.data;
          params.value = result.data;

          console.log(params);
          console.log(type);
          if (type == "venues") {
            const control = this.basicForm.get([
              "programs",
              index,
              "venues"
            ]) as FormControl;
            control.value.push(params);
            control.patchValue(control.value);
          } else if (type == "artists") {
            const control = this.basicForm.get([
              "programs",
              index,
              "artists"
            ]) as FormControl;
            control.value.push(params);
            control.patchValue(control.value);
            // this.basicForm.value.programs[index].artists.push(params)
          } else if (type == "services") {
            const control = this.basicForm.get([
              "programs",
              index,
              "services"
            ]) as FormControl;
            console.log(params);
            console.log(control.value);
            control.value.push(params);
            control.patchValue(control.value);
            // this.basicForm.value.programs[index].services.push(params)
          }
        } else if (result == "no") {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  public tagValidators = [this.endsWith$];

  private endsWith$(control: FormControl) {
    if (control.value.charAt(control.value.length - 1) !== ")") {
      return {
        endsWith$: true
      };
    }

    return null;
  }

  public clear() {
    // this.basicForm.reset();
    this.router.navigate(["myaccount"]);
  }

  public addVenue(i: number) {
    const confRef = this.modalService.open(
      AddVenueModalComponent,
      this.modalOption
    );
    confRef.componentInstance.setData = { value: "Create", data: null };
    confRef.result
      .then(response => {
        console.log(response);
        response["owner"] = response.url == "/myaccount" ? true : false;
        let params = response;
        this.addEventService.postVenue(params).subscribe((data: any) => {
          if (data.success) {
            console.log(data.details.venues[0].id);
            this.notiService.showSuccess(data.message, "", 4000);

            let venueId = this.pad(data.details.venues[0].id, 4);
            const control = this.basicForm.get([
              "programs",
              i,
              "venues"
            ]) as FormControl;
            control.value.push({
              display: response.name + " " + "(#" + venueId + ")",
              value: response.name + " " + "(#" + venueId + ")"
            });
            control.patchValue(control.value);
          } else {
            this.notiService.showError(data.message, "", 4000);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  public faqModal() {
    const confRef = this.modalService.open(FaqModalComponent, this.modalOption);
  }

  public setTargetUrl() {
    if (this.exists == false) {
      let val = this.basicForm.controls["slug"].value;
      this.showField = this.basicForm.controls["slug"].valid ? false : true;
      this.targetUrl =
        val.startsWith("http://") || val.startsWith("https://")
          ? val
          : "http://" + val;
    }
  }

  public isKidsSutitable(item: any) {
    this.isSuitableForKids = item.target.checked;
  }

  changeFile($event): void {
    this.readThisFile($event.target);
  }

  readThisFile(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      // this.fileName = myReader.result;
    };
    myReader.readAsDataURL(file);
    let postParams = new FormData();
    postParams.append("file", file, file.name);
    this.spinner.show();
    this.uploadService.uploadImage(postParams).subscribe(
      data => {
        this.spinner.hide();
        this.file = data["details"].location;
        if (this.file !== null) {
          let arr = this.file.split("-");
          this.fileName = arr[arr.length - 1];
        }
      },
      error => {
        this.spinner.hide();
        this.notiService.showError(error, "", 4000);
      }
    );
  }

  public createSlug() {
    let eventName = this.basicForm.controls["name"].value;
    eventName !== null && eventName !== "" && eventName !== undefined
      ? this.basicForm.controls["slug"].setValue(
        eventName + "_" + Math.floor(Math.random() * 10000) + 1
      )
      : this.basicForm.controls["slug"].setValue(null);
  }

  public checkSlug() {
    this.addEventService
      .checkSlug(this.basicForm.controls["slug"].value)
      .subscribe((res: any) => {
        if (!res.success) {
          this.exists = false;
        } else {
          this.exists = true;
        }
      });
  }
}
