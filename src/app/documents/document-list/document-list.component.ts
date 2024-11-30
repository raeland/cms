import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  selectedDocument: Document;
  private subscription: Subscription;
  documents: Document[] = [
    // new Document('1', 'Doc1', 'DocDescription1', 'www.abc1.org', []),
    // new Document('2', 'Doc2', 'DocDescription2', 'www.abc2.org', []),
    // new Document('3', 'Doc3', 'DocDescription3', 'www.abc3.org', []),
    // new Document('4', 'Doc4', 'DocDescription4', 'www.abc4.org', []),
    // new Document('5', 'Doc5', 'DocDescription5', 'www.abc5.org', [])
  ];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
      }
    });

    this.subscription = this.documentService.documentSelectedEvent.subscribe({
      next: (document: Document) => {
        this.selectedDocument = document;
      },
      error: (error) => {
        console.error('Error in document selection:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // onSelect(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  // }
}