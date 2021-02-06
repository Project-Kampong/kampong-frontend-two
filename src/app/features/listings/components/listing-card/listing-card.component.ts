import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from 'src/app/core/models/listing';

@Component({
  selector: 'listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent {
  constructor(private router: Router) {}

  @Input() listingData: Listing = <Listing>{};

  routeToListing(): void {
    this.router.navigate(['/listing/' + this.listingData.listing_id]);
  }
}
