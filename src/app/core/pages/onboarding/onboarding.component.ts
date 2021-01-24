import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { NotificationService } from '../../services/notification.service';
// Interface
import { Profile } from '../../models/profile';
import { profileForm } from '../../forms/profile';
import { UserData } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  private userData: UserData = <UserData>{};
  profileData: Profile = <Profile>{};
  isLoggedIn: boolean = false;
  editProfileForm = new FormGroup({});
  index: number = 0;

  ngOnInit() {
    this.editProfileForm = this.fb.group({ ...profileForm });
    if (this.authService.checkCookie()) {
      this.subscriptions.push(
        this.authService.getUserDataByToken().subscribe(
          (res) => {
            this.userData = res['data'];
            this.subscriptions.push(
              this.profileService.getUserProfile(this.userData['user_id']).subscribe(
                (res) => {
                  this.profileData = res['data'];
                  this.editProfileForm.patchValue(this.profileData);
                  this.isLoggedIn = true;
                  console.log(this.profileData);
                },
                (err) => {
                  console.log(err);
                },
              ),
            );
          },
          (err) => {
            console.log(err);
            console.log('User is not logged in');
            this.router.navigate(['/login']);
          },
        ),
      );
    }
  }

  onIndexChange(event: number): void {
    this.index = event;
  }

  saveProfile() {
    if (this.getFormValidationErrors()) {
      this.notificationService.openNotification(this.notificationService.DialogList.setup_profile.validation_error, false);
      return;
    }
    this.profileService.updateUserProfile(this.userData['user_id'], this.editProfileForm.value).subscribe(
      (res) => {
        if (true) {
          let ImageFd = new FormData();
          this.profileService.updateUserProfilePic(this.userData['user_id'], ImageFd).subscribe(
            (res) => {
              this.router.navigate(['/profile']);
            },
            (err) => {
              console.log(err);
            },
          );
        }
        //this.authService.LoginResponse.emit();
        console.log(res);
        this.notificationService.openNotification(this.notificationService.DialogList.setup_profile.success, true);
        this.router.navigate(['/profile']);
      },
      (err) => {
        console.log(err);
        this.notificationService.openNotification(this.notificationService.DialogList.setup_profile.error, false);
        this.router.navigate(['/profile']);
      },
    );
  }

  uploadFile(e: any): void {
    console.log('Upload file');
    this.profileData.profile_picture = e;
    this.editProfileForm.setValue(['profile_picture'], e);
  }

  getFormValidationErrors() {
    var error = false;
    Object.keys(this.editProfileForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null = this.editProfileForm.get(key);
      if (controlErrors != null) {
        if (controlErrors.errors) {
          Object.keys(controlErrors.errors).forEach((keyError) => {
            error = true;
          });
        }
      }
    });
    return error;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  checkPageOneErrors(): boolean {
    if (this.editProfileForm.controls.nickname.errors != null) {
      return true;
    }
    if (this.editProfileForm.controls.dob.errors != null) {
      return true;
    }
    return false;
  }

  checkPageTwoErrors(): boolean {
    if (this.editProfileForm.controls.occupation.errors != null) {
      return true;
    }
    return false;
  }
}
