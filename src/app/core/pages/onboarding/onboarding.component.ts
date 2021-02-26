import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { NotificationService } from '../../services/notification.service';
import { UploadService } from '../../services/upload.service';
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
export class OnboardingComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private uploadService: UploadService,
  ) {}

  private userData: UserData = <UserData>{};
  profileData: Profile = <Profile>{};
  isLoggedIn: boolean = false;
  editProfileForm = new FormGroup({});
  index: number = 0;
  isLoading: boolean = false;

  ngOnInit() {
    this.editProfileForm = this.fb.group({ ...profileForm });
    if (this.authService.checkCookie()) {
      this.subscriptions.push(
        this.authService.getUserDataByToken().subscribe(
          (res) => {
            this.userData = res['data'] as any; //Fix
            this.subscriptions.push(
              this.profileService.getUserProfile(this.userData['user_id']).subscribe(
                (res) => {
                  this.profileData = res['data'] as any;
                  this.editProfileForm.patchValue(this.profileData);
                  this.isLoggedIn = true;
                  console.log(this.profileData);
                  if (this.profileData.profile_picture == null) {
                    this.profileData.profile_picture = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
                  }
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
    this.isLoading = true;
    if (this.getFormValidationErrors()) {
      this.notificationService.openNotification(this.notificationService.dialogList.setup_profile.validation_error, false);
      return;
    }
    console.log('saveprofile', this.editProfileForm.value);
    this.profileService.updateUserProfile(this.userData['user_id'], this.editProfileForm.value).subscribe(
      (res) => {
        console.log('onboarding response', res);
        this.notificationService.openNotification(this.notificationService.dialogList.setup_profile.success, true);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this.notificationService.openNotification(this.notificationService.dialogList.setup_profile.error, false);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
    );
  }

  uploadFile(e: any): void {
    const file = e.target.files[0];
    this.editProfileForm.patchValue({
      profile_picture: file,
    });

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.profileData.profile_picture = reader.result as string;
    };
    reader.readAsDataURL(file);

    let ImageFd = new FormData();
    ImageFd.append('uploads', file);
    this.uploadService.uploadFile(ImageFd).subscribe(
      (res) => {
        console.log(res);
        this.editProfileForm.patchValue({
          profile_picture: res.data[0],
        });
      },
      (err) => {
        console.log(err);
      },
    );
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
}
