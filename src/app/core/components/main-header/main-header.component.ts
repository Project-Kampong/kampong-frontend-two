import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  constructor() {}

  toggleMenu(): void {
    const element: HTMLElement | null = document.getElementById('nav-toggle');
    if (element) {
      element.classList.toggle('nav-toggle-none');
    }
  }
}
