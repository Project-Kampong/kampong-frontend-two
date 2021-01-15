import { Component, Input } from '@angular/core';
import { Organisation } from 'src/app/core/models/organisation';

@Component({
  selector: 'organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.scss'],
})
export class OrganisationCardComponent {
  constructor() {}

  @Input() organisationData: Organisation = <Organisation>{};
}
