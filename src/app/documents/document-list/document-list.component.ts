import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  // @Output() 
  // documentSelectedEvent = new EventEmitter();
  selectedDocument: Document;
  // documentChangedEvent = new EventEmitter<Document[]>();
  private subscription: Subscription;
  documents: Document[] = [
    // new Document('1', 'Doc1', 'DocDescription1', 'www.abc1.org', []),
    // new Document('2', 'Doc2', 'DocDescription2', 'www.abc2.org', []),
    // new Document('3', 'Doc3', 'DocDescription3', 'www.abc3.org', []),
    // new Document('4', 'Doc4', 'DocDescription4', 'www.abc4.org', []),
    // new Document('5', 'Doc5', 'DocDescription5', 'www.abc5.org', [])
  ];

// documentId: string = '';

constructor(private documentService: DocumentService) {}


ngOnInit() {
  this.documents = this.documentService.getDocuments();
  this.subscription = this.documentService.documentSelectedEvent
  .subscribe((document: Document) => {
    this.selectedDocument = document;
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