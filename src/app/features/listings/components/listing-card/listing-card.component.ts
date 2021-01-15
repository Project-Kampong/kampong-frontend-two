import { Component, Input } from '@angular/core';
import { Listing } from 'src/app/core/models/listing';

@Component({
  selector: 'listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent {
  constructor() {}

  @Input() listingData: Listing = <Listing>{};
}
