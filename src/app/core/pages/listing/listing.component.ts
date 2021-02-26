import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListingsService } from './../../services/listings.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { API } from './../../models/api';
import { Listing } from './../../models/listing';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListingPageComponent implements OnInit {
  subscriptions: Subscription[] = [];
  activeTab: string = 'Home';
  listing = <Listing>{};
  listingId: string = '';

  constructor(private listingService: ListingsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id') as string;

    this.subscriptions.push(
      this.listingService.getSelectedListing(this.listingId).subscribe((response: API) => {
        console.log(response);
        this.listing = (response['data'] as unknown) as Listing; //Is this even correct
      }),
    );
  }

  changeTab(selectedTab: string) {
    this.activeTab = selectedTab;
  }
}
