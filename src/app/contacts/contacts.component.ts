import { Component, OnInit } from '@angular/core';

import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  id: string;
  selectedContact: Contact;

  constructor() {
    this.id = ''; // Initialize id in the constructor
  }

  ngOnInit() {
    // Initialization logic here
  }

}