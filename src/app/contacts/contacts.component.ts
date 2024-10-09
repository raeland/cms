import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class Contact implements OnInit{
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public imageUrl: string;
  public group?: Contact[];
  
  constructor(
  id: string,
  name: string,
  email: string,
  phone: string,
  imageUrl: string,
  group?: Contact[]
  )
  {
  this.id = id;
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.imageUrl = imageUrl;
  this.group = group;
  }
  ngOnInit(): void {
  }
}
