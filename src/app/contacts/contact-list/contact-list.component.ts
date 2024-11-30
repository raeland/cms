import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactsService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    // new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "assets/images/jacksonk.jpg", []),
    // new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "assets/images/barzeer.jpg", [])
  ];
  term: string = '';
  search(value: string) {
    this.term = value;
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}