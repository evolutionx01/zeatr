import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Input() chatData;
  chats: any = [];
  chatParticipant: any = [];
  message: string;
  sending: boolean;

  constructor(private _chatService: ChatService,
    public activeModal: NgbActiveModal) { }

    ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 



  ngOnInit() {
    this.scrollToBottom();
    this.chats = this.chatData.eventGroupMessageList
    this.chatParticipant = this.chatData.eventParticipantList

    this._chatService.getChannel().bind('my-event', data => {
      var obj = JSON.parse(data.message)
      if (obj.emailId === this._chatService.user.emailId) {
        obj.isMe = true;
      }
      this.chats.push(obj);
    });
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  sendMessage(message: string) {
    this.sending = true;
    this._chatService.sendMessage(message)
      .subscribe(resp => {
        this.message = undefined;
        this.sending = false;
      }, err => {
        this.sending = false;
      });
  }


}
