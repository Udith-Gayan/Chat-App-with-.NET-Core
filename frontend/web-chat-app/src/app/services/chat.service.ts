import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../Dto/MessageDto';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


   private  connection: any = new signalR.HubConnectionBuilder().withUrl(environment.hubConnectionURL)   // mapping to the chathub as in startup.cs
                                         .configureLogging(signalR.LogLevel.Information)
                                         .build();
   readonly POST_URL = environment.broadcastURL;


  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (user, message) => { this.mapReceivedMessage(user, message); });
   this.start();                 
  }


  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
 }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }


}
