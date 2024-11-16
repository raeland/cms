import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();


  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
   for (const document of this.documents) {
    const currentId = +document.id;
    if (currentId > maxId) {
      maxId = currentId;
    } 
   }  
    return maxId;
}

addDocument(newDocument: Document) {
  if (newDocument) {
    return;
  } 
}

  updateDocument(originalDocument: Document, newDocument: Document) {
    //check if documents are undefined
    if (!originalDocument || !newDocument) {
      //if so, exit
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
}

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}