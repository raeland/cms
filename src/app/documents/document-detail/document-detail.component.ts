import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
// @Input() 
document: Document;
id: string;

constructor(private documentService: DocumentService,
            private route: ActivatedRoute,
            private router: Router) {}

ngOnInit() {
  this.route.params
  .subscribe(
    (params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    }
  );
}

onEditRecipe() {
  this.router.navigate(['edit'], {relativeTo: this.route});
}
}
