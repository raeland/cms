import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contactListChanged = new Subject<Contact[]>();
  private maxContactId: number;
  

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
  }

  getContacts(): Observable<Contact[]> {
    return new Observable((observer) => {
      observer.next(this.contacts);
      observer.complete();
    });
  }
  // getContacts() {
  //   return this.http.get<Contact[]>('https://cmsrae-default-rtdb.firebaseio.com/contacts.json')
  //     .pipe(
  //       tap((contacts: Contact[]) => {
  //         this.contacts = contacts || [];
  //         this.maxContactId = this.getMaxId();
  //         this.contacts.sort((a, b) => {
  //           if (a.name < b.name) {
  //             return -1
  //           }
  //           if (a.name > b.name) {
  //             return 1
  //           }
  //           return 0;
  //         });
  //         this.contactListChanged.next(this.contacts.slice());
  //       },
  //         (error: any) => {
  //           console.error('An Error has occured: ', error);
  //         })
  //     );
  // }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact)
      return;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0)
      return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;  
    // const contactsListClone = this.contacts.splice();
    this.storeContacts();
  }
    
  addContact(contact: Contact) {
    if (!Contact)
      return;
    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
      // const contactsListClone = this.contacts.splice();
    this.storeContacts();
  }

  private getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId + 1;
  }
  
  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://cmsrae-default-rtdb.firebaseio.com/contacts.json', contactsString, { headers })
      .subscribe(() => {
        this.contactListChanged.next(this.contacts.slice());
      });
  }
}


// getContact(id: string): Contact | null {
//   for (let contact of this.contacts) {
//     if (contact.id === id) {
//       return contact;
//     }
//   }
//   return null;
// }

// private getMaxId(): number {
//   let maxId = 0;
//   for (const contact of this.contacts) {
//     const currentId = +contact.id;
//     if (currentId > maxId) {
//       maxId = currentId;
//     }
//   }
//   return maxId;
// }



// deleteContact(contact: Contact) {
//   if (!contact) {
//     return;
//   }
//   const pos = this.contacts.indexOf(contact);
//   if (pos < 0) {
//     return;
//   }
//   this.contacts.splice(pos, 1);
//   const contactsListClone = this.contacts.splice();
//   this.storeContacts();
// }