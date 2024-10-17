import { Component,OnInit } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { MessagesComponent } from '../messages.component';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent {
    messages: Message[] = [];
  
    constructor() {}  

    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}
  
  
