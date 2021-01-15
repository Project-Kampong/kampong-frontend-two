import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListingsService } from 'src/app/features/listings/services/listings.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  featuredListings: Listing[] = [];
  subscriptions: Subscription[] = [];

  constructor(private listingsService: ListingsService) {}
  ngOnInit(): void {
    window.scroll(0, 0);

    //Need to change to featured listings
    this.subscriptions.push(
      this.listingsService.getListings().subscribe(
        (res) => {
          this.featuredListings = res['data'];
          console.log(this.featuredListings);
        },
        (err) => {
          console.log(err);
        },
      ),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
