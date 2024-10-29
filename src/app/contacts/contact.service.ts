import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';

import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  private contacts: Contact []=[];

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id:string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
}