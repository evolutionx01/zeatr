import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  @Input() setData: any;
  serviceForm : FormGroup;
  deliveryList: string[];
  isCreated : boolean;
  value: string;
  List: string[];
  daysList: any;
  hoursList: any;
  constructor(private formBuilder: FormBuilder,public activeModal: NgbActiveModal,) { }

  ngOnInit() {
    this.buildForm();
    this.prepareDays();
    this.prepareHours();
    this.deliveryList = ['Pickup at store to venue','NA'];
    this.List = ['Yes','No']
    this.value = this.setData.value;
    if (this.setData.data !== null) {
      this.serviceForm.patchValue(this.setData.data);
      this.setData.data.leadTime.substring(0,this.setData.data.leadTime.length-1).split('-')
      this.serviceForm.controls['day'].patchValue(this.setData.data.leadTime[0]);
      this.serviceForm.controls['hour'].patchValue(this.setData.data.leadTime[2]);
      this.serviceForm.updateValueAndValidity();
    }
    
  }
  public buildForm() {
    this.serviceForm = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(null),
      'quantityAvailable': new FormControl(null),
      'cost': new FormControl(null),
      'leadTime': new FormControl(null),
      'preRequirement': new FormControl(null),
      'delivery': new FormControl('Pickup at store to venue'),
      'prepayment': new FormControl(null),
      'hour': new FormControl('0'),
      'day': new FormControl('1'),
    })

  }
  actionClicked(data) {
    this.activeModal.close(data)
  }

  public saveService(){
    this.serviceForm.controls['leadTime'].setValue(this.serviceForm.controls['day'].value + '-' + this.serviceForm.controls['hour'].value);
    this.activeModal.close(this.serviceForm.value);
  }

  public prepareDays(){
    this.daysList = [];
    for(let i = 0; i<=30;i++){
      this.daysList.push(i)
    }
  }

  public prepareHours(){
    this.hoursList = [];
    for(let i = 0; i<=23;i++){
      this.hoursList.push(i)
    }
  }

}
