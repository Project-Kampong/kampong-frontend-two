import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { registerForm } from '../../forms/register';
import { MustMatch } from '../../forms/mustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private modalService: ModalService,
    private notificationService: NotificationService,
  ) {}

  registerForm = new FormGroup({});
  showLoading: boolean = false;
  isVisible: boolean = true;

  ngOnInit() {
    this.registerForm = this.fb.group(
      { ...registerForm },
      {
        validator: MustMatch('password', 'confirmPassword'),
      },
    );
  }

  registerUser(): void {
    this.subscriptions.push(
      this.authService.registerUser(this.registerForm.value).subscribe(
        (res) => {
          this.cookieService.set('token', res['token']);
          this.authService.setLogIn(); //temporary method to bypass auth guard
          this.notificationService.openNotification(this.notificationService.DialogList.register.success, true);
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.notificationService.openNotification(err.error.error, false);
        },
        () => {
          this.router.navigate(['/']);
          this.openEmailVerification();
        },
      ),
    );
  }

  openEmailVerification(): void {
    this.modalService.openModal(
      'Verify Email',
      `An Email containing a verification link has been sent to your email. Please click on the link to activate your account.
        <p></p><p>You will <b>NOT</b> be able to use the functionalities of this application without verifying your account. </p>
        *this modal will not be closable till the verification link is clicked*
        <br /><p></p><a target="_blank" href="https://github.com/Project-Kampong/kampong-frontend">Resend activation email</a>`,
      600,
    );
    console.log('open email verification');
  }

  getFormValidationErrors(): boolean {
    if (this.registerForm.controls.username.errors !== null) {
      return true;
    }
    if (this.registerForm.controls.email.errors !== null) {
      return true;
    }
    if (this.isPasswordNotMatching()) {
      return true;
    }
    if (this.registerForm.controls.termsAndCondition.errors !== null) {
      return true;
    }
    return false;
  }

  isPasswordNotMatching(): boolean {
    return !(this.registerForm.value.password === this.registerForm.value.confirmPassword);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
