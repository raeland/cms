import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactsService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-contact-edit',
	templateUrl: './contact-edit.component.html',
	styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
	contact: Contact | null = null;
	originalContact: Contact | null = null;
	groupContacts: Contact[] = [];
	editMode: boolean = false;
	id: string;

	constructor(
		private contactsService: ContactsService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.params.subscribe(
			(params: Params) => {
				const id = params['id'];
				if (!id) {
					this.editMode = false;
					return;
				}
				// this.id = id;
				const retrievedContact = this.contactsService.getContact(id);
				if (!retrievedContact)
					return;
				this.originalContact = retrievedContact;
				this.editMode = true;
				this.contact = JSON.parse(JSON.stringify(this.originalContact));
				if (this.originalContact.group) {
					this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group))
				}
			});
	}

	onCancel() {
		this.router.navigate(['/contacts'], { relativeTo: this.route });
	}

	onSubmit(form: NgForm) {
		const values = form.value;
		const newContact = new Contact(
			'',
			values.name,
			values.email,
			values.phone,
			values.imageUrl,
			this.groupContacts
		);

		if (this.editMode && this.originalContact) {
			this.contactsService.updateContact(this.originalContact, newContact);
		} else {
			this.contactsService.addContact(newContact);
		}

		this.router.navigate(['/contacts'], { relativeTo: this.route });
	}

	isInvalidContact(newContact: Contact): boolean {
		if (!newContact || !this.contact) {
			return true;
		}

		if (newContact.id === this.contact.id) {
			return true;
		}

		for (let i = 0; i < this.groupContacts.length; i++) {
			if (newContact.id === this.groupContacts[i].id) {
				return true;
			}
		}
		return false;
	}

	addToGroup($event: any) {
		const selectedContact: Contact = $event.dragData;
		const invalidGroupContact = this.isInvalidContact(selectedContact);
		if (invalidGroupContact) {
			return;
		}
		this.groupContacts.push(selectedContact);
	}

	onRemoveItem(idx: number) {
		if (idx < 0 || idx >= this.groupContacts.length) {
			return;
		}
		this.groupContacts.splice(idx, 1);
	}
}
