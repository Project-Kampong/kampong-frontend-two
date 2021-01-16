import { Component, Input } from '@angular/core';
import { Listing } from '../../models/listing';

@Component({
  selector: 'main-listing-grid',
  templateUrl: './main-listing-grid.component.html',
  styleUrls: ['./main-listing-grid.component.scss'],
})
export class MainListingGridComponent {
  constructor() {}

  @Input() featuredListings: Listing[] = [];
}
