import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  // private documents: Document[] = MOCKDOCUMENTS;
  private maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();


  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments(): Observable<Document[]> {
    return new Observable((observer) => {
      observer.next(this.documents);
      observer.complete();
    })
  }
  // getDocuments() {
  //   return this.http.get<Document[]>('https://cms-rae-default-rtdb.firebaseio.com/documents.json')
  //     .pipe(
  //       tap((documents: Document[]) => {
  //         this.documents = documents || [];
  //         this.maxDocumentId = this.getMaxId();
  //         this.documents.sort((a, b) => {
  //           if (a.name < b.name) {
  //             return -1
  //           }
  //           if (a.name > b.name) {
  //             return 1
  //           }
  //           return 0;
  //         });
  //         this.documentListChangedEvent.next(this.documents.slice());
  //       }
  //         ,
  //         (error: any) => {
  //           console.error('An Error has occured: ', error);
  //         })
  //     );
  // }
  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    console.warn(`Document with ID ${id} not found in documents.`);
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
    if (!newDocument)
      return;
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument)
      return;
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0)
      return;
    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document)
      return;
    const pos = this.documents.indexOf(document);
    if (pos < 0)
      return;
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-rae-default-rtdb.firebaseio.com/documents.json', documentsString, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}

function tap(arg0: (documents: Document[]) => void, arg1: (error: any) => void): import("rxjs").OperatorFunction<Document[], unknown> {
  throw new Error('Function not implemented.');
}
