import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// Interface
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { userLoginForm } from '../../forms/login';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private notificationService: NotificationService,
  ) {}

  loginCredentials = new FormGroup({});
  loginErrorMsg = false;

  ngOnInit() {
    this.loginCredentials = this.fb.group({
      ...userLoginForm,
    });
  }

  loginUser(): void {
    const loginDetails = this.loginCredentials.value;

    this.subscriptions.push(
      this.authService.loginUser(loginDetails).subscribe(
        (res) => {
          this.cookieService.set('token', res['token']);
          this.authService.setLogIn(); //temporary method to bypass auth guard
          this.notificationService.openNotification(this.notificationService.DialogList.login.success, true);
          console.log(this.authService.isLoggedIn);
        },
        (err) => {
          console.log(err);
          this.notificationService.openNotification(this.notificationService.DialogList.login.error, false);
        },
        () => {
          this.router.navigate(['/onboarding']);
        },
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /*
  loginCheck() {
    if (
      this.loginCredentials.value.email == "" ||
      this.loginCredentials.value.password == ""
    ) {
      this.SnackbarService.openSnackBar(
        this.SnackbarService.DialogList.login.error,
        false
      );
    } else {
      this.authService.userLogin(this.loginCredentials.value);
    }
  }
  */
}
