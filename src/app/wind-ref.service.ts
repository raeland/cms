import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {
windowRefService: WindRefService;

  constructor() { }

  getNativeWindow() {
    return window;
  }
}
