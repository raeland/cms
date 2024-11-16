import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';

import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>
  contactChangedEvent = new EventEmitter<Contact[]>();
  maxContactId: number;
  contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
   

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

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {

    if (!originalContact || !newContact) {
      //exit
      return;
    }
  }
  
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
  }
}