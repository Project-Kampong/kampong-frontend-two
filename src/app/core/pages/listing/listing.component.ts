import { Component, OnInit } from '@angular/core';
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
})
export class ListingPageComponent implements OnInit {
  subscriptions: Subscription[] = [];
  activeTab: string = 'Home';
  listing = <Listing>{};

  constructor(private listingService: ListingsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let listingId: any = ''; //Having trouble with the typescript if i dont use 'any'
    listingId = this.route.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.listingService.getSelectedListing(listingId).subscribe((response: API) => {
        this.listing = (response['data'] as unknown) as Listing; //Is this even correct
        console.log(this.listing);
      }),
    );
  }

  changeTab(selectedTab: string) {
    this.activeTab = selectedTab;
  }
}
