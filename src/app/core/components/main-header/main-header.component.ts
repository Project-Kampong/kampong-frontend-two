import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from '../../models/profile';
import { UserData } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isLoggedIn: boolean = false;
  isProfileDropdown: boolean = false;
  isNotificationDropdown: boolean = false;
  isChatDropdown: boolean = false;
  private userData: UserData = <UserData>{};
  profileData: Profile = <Profile>{};

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.checkCookie()) {
      this.subscriptions.push(
        this.authService.getUserDataByToken().subscribe(
          (res) => {
            this.userData = res['data'] as any;
            this.subscriptions.push(
              this.profileService.getUserProfile(this.userData['user_id']).subscribe(
                (res) => {
                  this.profileData = res['data'] as any;
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
          },
        ),
      );
    }
    this.logoutUser = this.logoutUser.bind(this);
    this.routeToProfile = this.routeToProfile.bind(this);
  }

  routeToProfile(): void {
    this.router.navigate(['/profile/' + this.userData.user_id]);
  }

  routeToChat(): void {
    this.router.navigate(['/chat']);
  }

  logoutUser(): void {
    this.isLoggedIn = false;
    this.notificationService.openNotification(this.notificationService.dialogList.logout.success, true);
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleProfile(): void {
    const element: HTMLElement | null = document.getElementById('dropdown');
    if (element) {
      this.isProfileDropdown = !this.isProfileDropdown;
      this.isChatDropdown = false;
      this.isNotificationDropdown = false;
      element.classList.toggle('rotate-dropdown');
    }
  }

  toggleNotification(): void {
    this.isChatDropdown = false;
    this.isProfileDropdown = false;
    this.isNotificationDropdown = !this.isNotificationDropdown;
  }

  toggleChat(): void {
    this.isNotificationDropdown = false;
    this.isProfileDropdown = false;
    this.isChatDropdown = !this.isChatDropdown;
  }

  toggleMenu(): void {
    const element: HTMLElement | null = document.getElementById('nav-toggle');
    if (element) {
      element.classList.toggle('nav-toggle-none');
    }
  }
}
