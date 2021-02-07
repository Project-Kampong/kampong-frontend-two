import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss'],
})
export class ProfileAboutComponent {
  constructor() {}

  @Input() profileData: Profile = <Profile>{};
}
