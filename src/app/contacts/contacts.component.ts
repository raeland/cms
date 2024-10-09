import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  id: string;

  constructor() {
    this.id = ''; // Initialize id in the constructor
  }

  ngOnInit() {
    // Initialization logic here
  }
}