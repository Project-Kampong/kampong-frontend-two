import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './environments/environment';

//pages
import { MainPageComponent } from './pages/main-page/main-page.component';

//components
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainSearchComponent } from './components/main-search/main-search.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { LoginPageComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, MainHeaderComponent, MainFooterComponent, MainSearchComponent, LoginPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
