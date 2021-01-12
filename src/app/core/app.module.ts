import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, MainHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
