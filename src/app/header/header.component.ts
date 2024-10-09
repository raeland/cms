import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // header: string[] = [
  //   'string', 'string', 'string', 'string', 'string'
  // ];
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor() { }
}
