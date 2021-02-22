import { Component, OnInit } from '@angular/core';
import { ListingsService } from './../../services/listings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingPageComponent implements OnInit {
  subscriptions: Subscription[] = [];

  activeTab: string = 'Home';

  constructor(private listingService: ListingsService) {}

  ngOnInit(): void {
    this.subscriptions.push();
  }

  changeTab(selectedTab: string) {
    this.activeTab = selectedTab;
  }
}
