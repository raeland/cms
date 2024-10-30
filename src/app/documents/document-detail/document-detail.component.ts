import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service'; // idk why this isn't working :(

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  // @Input() 
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private windowRefService: WindRefService, // idk why this isn't working :(
    private route: ActivatedRoute,
    private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(params['id']); // idk why this isn't working :(
        }
      );
  }

  onEditDocument() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  OnView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

}
