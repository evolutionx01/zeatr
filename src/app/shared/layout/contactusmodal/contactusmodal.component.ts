import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ContactService } from "../contact.service";
import { ToasterNotiService } from "../../services/notification/toaster-noti.service";

@Component({
  selector: "app-contactusmodal",
  templateUrl: "./contactusmodal.component.html",
  styleUrls: ["./contactusmodal.component.scss"]
})
export class ContactusmodalComponent implements OnInit {
  basicContactForm: FormGroup;
  queryList = ['General','Technical','Marketing']
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private notiService: ToasterNotiService
  ) {}
  private emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private mobilePattern: any = "^((\\+91-?)|0)?[0-9]{11}$";
  ngOnInit() {
    this.buildContactForm();
  }
  // actionClicked(data) {
  //   this.activeModal.close(data);
  // }

  public buildContactForm() {
    this.basicContactForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      code: new FormControl("", [Validators.required]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(this.mobilePattern)
      ]),
      mobile: new FormControl(""),
      message: new FormControl("", [Validators.required]),
      queryType:new FormControl("General",Validators.required)
    });
  }

  public sendMessage() {
    this.basicContactForm.value.mobile =
      this.basicContactForm.value.code +
      "-" +
      this.basicContactForm.value.phone;
    console.log(this.basicContactForm.value);
    this.contactService
      .sendMessage(this.basicContactForm.value)
      .subscribe((res: any) => {
    if (res.success) {
      this.notiService.showSuccess(res.message, "", 4000);
      this.activeModal.close("data");
    } else {
      this.notiService.showError(res.message, "", 4000);
    }
    });
  }
}
