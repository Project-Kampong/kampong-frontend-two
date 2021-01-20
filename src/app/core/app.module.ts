import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './environments/environment';

//pages
import { MainPageComponent } from './pages/main-page/main-page.component';

//components
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainSearchComponent } from './components/main-search/main-search.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainListingGridComponent } from './components/main-listing-grid/main-listing-grid.component';
import { LoginPageComponent } from './pages/login/login.component';
import { ListingCardComponent } from '../features/listings/components/listing-card/listing-card.component';
import { OrganisationCardComponent } from '../features/organisations/components/organisation-card.component';
import { MainOrganisationGridComponent } from './components/main-organisation-grid/main-organisation-grid.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { ListingComponent } from './pages/listing/listing.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainSearchComponent,
    LoginPageComponent,
    MainListingGridComponent,
    ListingCardComponent,
    MainOrganisationGridComponent,
    OrganisationCardComponent,
    RegisterPageComponent,
    ListingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
