import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  // id: string;
  selectedContact: Contact;
  contacts: Contact[] = [];
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    })
  }
}