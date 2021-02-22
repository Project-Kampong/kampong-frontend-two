import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  subscriptions: Subscription[] = [];
  profileData: Profile = <Profile>{};
  profileId: string = '';

  ngOnInit(): void {
    window.scroll(0, 0);
    this.profileId = this.route.snapshot.params['id'];
    this.subscriptions.push(
      this.profileService.getUserProfile(this.profileId).subscribe(
        (data) => {
          this.profileData = (data['data'] as unknown) as Profile;
          console.log(this.profileData);
        },
        (err) => {
          console.log(err);
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
