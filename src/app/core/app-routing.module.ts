import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { ListingComponent } from './pages/listing/listing.component';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'listing/:id', component: ListingComponent, canActivate: [AuthGuard] },
  { path: 'create-listing', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'organisation/:id', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'create-organisation', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'onboarding', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: LoginPageComponent },
  // otherwise redirect to home or we can redirect to a general page not found page
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
