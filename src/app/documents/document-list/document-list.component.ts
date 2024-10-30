import { Component, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  // @Output() selectedDocumentEvent = new EventEmitter();

  documents: Document[] = [
    // new Document('1', 'Doc1', 'DocDescription1', 'www.abc1.org', []),
    // new Document('2', 'Doc2', 'DocDescription2', 'www.abc2.org', []),
    // new Document('3', 'Doc3', 'DocDescription3', 'www.abc3.org', []),
    // new Document('4', 'Doc4', 'DocDescription4', 'www.abc4.org', []),
    // new Document('5', 'Doc5', 'DocDescription5', 'www.abc5.org', [])
  ];
selectedDocument: Document;
// documentId: string = '';

constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }
  // onSelectedDocument(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  // }
}
