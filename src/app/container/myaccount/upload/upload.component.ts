import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadService } from './upload.service';
import { ToasterNotiService } from 'src/app/shared/services/notification/toaster-noti.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() uploadType: any;

  public uploadimg: FormGroup;

  public fileList: any;
  public title: string;

  public showBasicDetails: boolean

  public showUploadVideo: boolean
  public showYoutubeVideo: boolean

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private notiService: ToasterNotiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.buildUploadImg();

    if (this.uploadType.type == 'img') {
      this.title = 'Upload Image'
      this.showBasicDetails = true
      this.showUploadVideo = false;
      this.showYoutubeVideo = false;
    } else if (this.uploadType.type == 'video') {
      this.title = 'Upload Video'
      this.showBasicDetails = true
      this.showUploadVideo = true;
      this.showYoutubeVideo = false;
    } else if (this.uploadType.type == 'yt') {
      this.title = 'Upload YouTube'
      this.showBasicDetails = true
      this.showUploadVideo = true;
      this.showYoutubeVideo = true;
    } else if (this.uploadType.type == 'profile') {
      this.title = 'Upload Profile Picture'
      this.showBasicDetails = false
      this.showUploadVideo = false;
      this.showYoutubeVideo = false;
    }
  }

  public buildUploadImg() {
    this.uploadimg = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      ytUrl: new FormControl('')
    })
  }


  fileChangeEvent(event: any): void {
    this.fileList = event.target.files[0];
  }

  public uploadProfileImages() {
    this.spinner.show()
    let postParams = new FormData();
    postParams.append('file', this.fileList, this.fileList.name);

    this.uploadService.uploadProfileImage(postParams).subscribe(
      data => {
        this.uploadedProfileImageDetails(data)
      }, error => {
        this.spinner.hide()
        this.notiService.showError(error, '', 4000)
      }
    )
  }

  private uploadedProfileImageDetails(data: any) {
    this.spinner.hide()
    if (data.success) {
      let uploadResult = {
        data: data.details,
        success: 'yes',
        type: 'profile'
      }
      this.notiService.showSuccess(data.message, '', 4000)
      this.activeModal.close(uploadResult)
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

  public uploadImages() {
    this.spinner.show()
    let postParams = new FormData();
    postParams.append('file', this.fileList, this.fileList.name);
    postParams.append('title', this.uploadimg.value.title);
    postParams.append('description', this.uploadimg.value.desc);

    this.uploadService.uploadImage(postParams).subscribe(
      data => {
        this.uploadedImageDetails(data)
      }, error => {
        this.spinner.hide()
        this.notiService.showError(error, '', 4000)
      }
    )
  }

  private uploadedImageDetails(data: any) {
    this.spinner.hide()
    if (data.success) {
      let uploadResult = {
        data: data.details,
        success: 'yes',
        type: 'image'
      }
      this.notiService.showSuccess(data.message, '', 4000)
      this.activeModal.close(uploadResult)
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }

  public uploadVideo(type) {
    this.spinner.show()

    if (type == 'video') {
      let postParams = new FormData();
      postParams.append('videoFile', this.fileList, this.fileList.name);
      postParams.append('title', this.uploadimg.value.title);
      postParams.append('description', this.uploadimg.value.desc);

      this.uploadService.uploadVideo(postParams).subscribe(
        data => {
          this.uploadedVideoDetails(data)
        }, error => {
          this.spinner.hide()
          this.notiService.showError(error, '', 4000)
        }
      )
    }else if(type = 'yt'){
      let params = {
        description: 'adfasfa',
        title: 'test you',
        location: 'https://www.youtube.com/watch?v=JZ8aRTD_u9w'
      }

      this.uploadService.uploadYoutubeVideo(params).subscribe(
        data => {
          this.uploadedVideoDetails(data)
        }, error => {
          this.spinner.hide()
          this.notiService.showError(error, '', 4000)
        }
      )

    }

  }

  private uploadedVideoDetails(data: any) {
    this.spinner.hide()
    if (data.success) {
      let uploadResult = {
        data: data.details,
        success: 'yes',
        type: 'video'
      }
      this.notiService.showSuccess(data.message, '', 4000)
      this.activeModal.close(uploadResult)
    } else {
      this.notiService.showError(data.message, '', 4000)
    }
  }








  actionClicked(data: any) {
    this.activeModal.close(data)
  }

}
