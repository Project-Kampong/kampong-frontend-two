import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  activeTab: string = 'Home';

  constructor() {}

  ngOnInit(): void {}

  changeTab(selectedTab: string) {
    this.activeTab = selectedTab;
  }
}
