import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  // ngOnInit() {
  //   this.documents = this.documentService.getDocuments();
  //   this.subscription = this.documentService.documentSelectedEvent
  //   .subscribe((document: Document) => {
  //     this.selectedDocument = document;
  //   });
  // }
  // ngOnInit(): void {
  //   this.documentService.documentChangedEvent.subscribe((document: Document) => {
  //     this.selectedDocument = document;
  //   })
  // }
  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documents: Document[]) => {
    this.documents = documents;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelect(document: Document) {
    this.documentService
  }
}
