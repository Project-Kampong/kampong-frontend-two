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
  loginErrorMsg: boolean = false;
  isLoading: boolean = false;

  ngOnInit() {
    this.loginCredentials = this.fb.group({
      ...userLoginForm,
    });
  }

  loginUser(): void {
    this.isLoading = true;
    const loginDetails = this.loginCredentials.value;

    this.subscriptions.push(
      this.authService.loginUser(loginDetails).subscribe(
        (res) => {
          this.cookieService.set('token', res['token']);
          this.authService.setLogIn(); //temporary method to bypass auth guard
          this.notificationService.openNotification(this.notificationService.dialogList.login.success, true);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.notificationService.openNotification(this.notificationService.dialogList.login.error, false);
          this.isLoading = false;
        },
        () => {
          this.router.navigate(['/']);
        },
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
