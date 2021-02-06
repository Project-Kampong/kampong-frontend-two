import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent {
  constructor() {}
  @Input() profileData: Profile = <Profile>{};
}
