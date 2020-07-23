import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {MessageDto } from 'src/app/Dto/MessageDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.start();
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => {this.addToInbox(receivedObj);
                                                     });
  }
  title = 'web-chat-app';

  msgDto: MessageDto = new MessageDto();

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);
      }
    }
  }

  addToInbox(obj: MessageDto) {

    let ul = document.getElementsByTagName('ul')[0];
    let li = document.createElement('li');
    if(obj.user === this.msgDto.user) {
      li.classList.add('in-msg');
    } else {
      li.classList.add('ex-msg');
    }

    let modifiedMessage = `${obj.user} : <br /><span class="msg-italic-style">${obj.msgText}</span>`;
    li.textContent = modifiedMessage;

    ul.appendChild(li);

  }
}


