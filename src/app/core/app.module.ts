import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HeaderProfileComponent } from '../features/profile/components/header-profile/header-profile.component';
import { HeaderNotificationComponent } from '../features/notifications/components/header-notification/header-notification.component';
import { HeaderChatComponent } from '../features/chat/components/header-chat/header-chat.component';
registerLocaleData(en);
import { ProfilePageComponent } from './pages/profile/profile.component';
import { ListingPageComponent } from './pages/listing/listing.component';
import { ProfileAboutComponent } from '../features/profile/components/profile-about/profile-about.component';
import { ProfileInfoComponent } from '../features/profile/components/profile-info/profile-info.component';
import { ChatPageComponent } from './pages/chat/chat.component';
import { ChatNavPreviewComponent } from '../features/chat/components/chat-nav-preview/chat-nav-preview.component';
import { ChatWindowComponent } from '../features/chat/components/chat-window/chat-window.component';

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
    TermsAndConditionsComponent,
    OnboardingComponent,
    HeaderProfileComponent,
    HeaderNotificationComponent,
    HeaderChatComponent,
    ListingPageComponent,
    ProfilePageComponent,
    ProfileAboutComponent,
    ProfileInfoComponent,
    ChatPageComponent,
    ChatNavPreviewComponent,
    ChatWindowComponent,
  ],
  imports: [
    BrowserModule,
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
    NzUploadModule,
    NzInputModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
