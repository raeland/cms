import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
//  @Input() 
 contact: Contact | null;
 id: string;

  constructor(
    private contactsService: ContactsService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.contact = this.contactsService.getContact(params['id']);
      }
    )
  }

  // ngOnInit() {
  //   this.route.params
  //   .subscribe((params: Params) => {
  //     const contactId = params['id'];
  //             this.contact = this.contactsService.getContact(contactId);
  //   });
  // }

  // onDelete() {
  //   this.contactsService.deleteContact(this.contact);
  //   this.router.navigateByUrl('/contacts');
  // }
  }
