import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListingsService } from 'src/app/features/listings/services/listings.service';
import { OrganisationsService } from 'src/app/features/organisations/services/organisations.service';
import { Cause, causes } from '../../constants/causes';
import { API } from '../../models/api';
import { Listing } from '../../models/listing';
import { Organisation } from '../../models/organisation';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  featuredListings: Listing[] = [];
  featuredOrganisations: Organisation[] = [];
  subscriptions: Subscription[] = [];
  causes: Cause[] = causes;

  constructor(private listingsService: ListingsService, private organisationsService: OrganisationsService) {}
  ngOnInit(): void {
    window.scroll(0, 0);

    //Need to change to featured listings
    this.subscriptions.push(
      this.listingsService.getListings().subscribe(
        (res: API) => {
          this.featuredListings = res['data'].slice(0, 6) as Listing[];
        },
        (err) => {
          console.log(err);
        },
      ),
    );

    this.subscriptions.push(
      this.organisationsService.getOrganisations().subscribe(
        (res: API) => {
          this.featuredOrganisations = res['data'].slice(0, 6) as Organisation[];
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
