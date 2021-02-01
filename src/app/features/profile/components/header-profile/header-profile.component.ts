import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';

@Component({
  selector: 'header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent {
  constructor() {}

  @Input() profileData: Profile = <Profile>{};
  @Input() logoutUser: Function = () => true;
}
