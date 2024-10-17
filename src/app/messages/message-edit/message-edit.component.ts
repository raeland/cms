import { Component, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  currentSender: string = 'Rachael S Varady';

  constructor() {}

  onSendMessage() {
    if (this.subject && this.subject.nativeElement) {
      const subject = this.subject.nativeElement.value;
      const msgText = this.msgText.nativeElement.value;
      const message = new Message('1', subject, msgText, this.currentSender);
      this.addMessageEvent.emit(message);
    }
  }

  onClear() {}
}