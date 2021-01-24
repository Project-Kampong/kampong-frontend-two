import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
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

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService) {}

  registerForm = new FormGroup({});
  showLoading: boolean = false;

  ngOnInit() {
    this.registerForm = this.fb.group(
      { ...registerForm },
      {
        validator: MustMatch('password', 'confirmPassword'),
      },
    );
  }

  registerUser(): void {
    console.log('button clicked');
    console.log(this.registerForm.value);
    this.subscriptions.push(
      this.authService.registerUser(this.registerForm.value).subscribe(
        (res) => {
          // this.cookieService.set('token', res['token']);
          // this.snackbarService.openSnackBar(this.snackbarService.DialogList.register.success, true);
          console.log(res);
        },
        (err) => {
          console.log(err);
          // this.snackbarService.openSnackBar(err.error.error, false);
          // this.snackbarService.openSnackBar(this.snackbarService.DialogList.register.error, false);
        },
        () => {
          // this.showLoading = false;
          this.router.navigate(['/']);
        },
      ),
    );
  }

  openEmailVerification(): void {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   data: {
    //     title: 'Verify Email',
    //     content: `An Email containing a verification link has been sent to your email. Please click on the link to activate your account.
    //     <p></p><p>You will <b>NOT</b> be able to use the functionalities of this application without verifying your account. </p>
    //     *this modal will not be closable till the verification link is clicked*
    //     <br /><p></p><a target="_blank" href="https://github.com/Project-Kampong/kampong-frontend">Resend activation email</a>`,
    //   },
    // });
    console.log('open email verification');
  }

  getFormValidationErrors(): boolean {
    // if (this.registerForm.controls.first_name.errors !== null) {
    //   return true;
    // }
    // if (this.registerForm.controls.last_name.errors !== null) {
    //   return true;
    // }
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
