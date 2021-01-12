// Angular Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent {
  constructor(private router: Router) {}

  initiateSearch() {
    this.router.navigate(['/search'], {
      state: {},
    });
  }
}
