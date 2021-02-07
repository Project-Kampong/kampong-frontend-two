import { Component, Input } from '@angular/core';
import { Organisation } from '../../models/organisation';

@Component({
  selector: 'main-organisation-grid',
  templateUrl: './main-organisation-grid.component.html',
  styleUrls: ['./main-organisation-grid.component.scss'],
})
export class MainOrganisationGridComponent {
  constructor() {}

  @Input() featuredOrganisations: Organisation[] = [];
}
