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
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainSearchComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TermsAndConditionsComponent,
    OnboardingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    NzButtonModule,
    NzNotificationModule,
    NzFormModule,
    NzCheckboxModule,
    NzModalModule,
    NzStepsModule,
    NzGridModule,
    NzImageModule,
    NzDatePickerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
