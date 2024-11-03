import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from '../../wind-ref.service'; // idk why this isn't working :(

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  // @Input() 
  document: Document | null;
  id: string;
  nativeWindow: any;
  // documentDetail!: Document | null;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService, // idk why this isn't working :(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.nativeWindow = WindRefService.getNativeWindow();
  }

  ngOnInit() {
    // this.nativeWindow = WindRefService.getNativeWindow();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id); // idk why this isn't working :(
        }
      );
  }

  onEditDocument() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document?.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document?);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

}
