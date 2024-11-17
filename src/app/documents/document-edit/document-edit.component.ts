import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        // this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onCancel() {
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newDocument = new Document(
      values.null,
      values.name,
      values.description,
      values.documentUrl,
      values.null);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}
