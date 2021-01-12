import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateOrganisation, UpdateOrganisation } from '../../../core/models/organisation';
import { API } from '../../../core/models/api';

// Services Import
import { Observable } from 'rxjs';
import { environment } from '../../../core/environments/environment';
import { AuthService } from '../../../core/services/auth.service';

interface OptionObject {
  headers: HttpHeaders;
  authorization?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  private url: string = environment.apiUrl;
  private options: OptionObject = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  /**
   * Get all organisations
   * @event GET
   */
  getOrganisations(): Observable<API> {
    return this.httpClient.get<API>(this.url + 'api/organisations', this.options);
  }

  /**
   * Get a particular organisation
   * @param organisationId Organisation ID
   * @event GET
   */
  getSelectedOrganisation(organisationId: string): Observable<API> {
    return this.httpClient.get<API>(this.url + 'api/organisations/' + organisationId, this.options);
  }

  /**
   * Create an organisation
   * @param data Organisation Data
   * @event POST
   */
  createOrganisation(data: CreateOrganisation): Observable<API> {
    return this.httpClient.post<API>(this.url + 'api/organisations', data, this.authService.getAuthOptionsWithoutContentType());
  }

  /**
   * Update organisation details
   * @param organisationId Organisation ID
   * @param data Updated Organisation Data
   * @event PUT
   */
  updateOrganisation(organisationId: string, data: UpdateOrganisation): Observable<API> {
    return this.httpClient.put<API>(this.url + 'api/organisations/' + organisationId, data, this.authService.getAuthOptionsWithoutContentType());
  }

  /**
   * Delete a particular organisation
   * @param organisationId Organisation ID
   * @event DELETE
   */
  removeOrganisation(organisationId: string): Observable<API> {
    return this.httpClient.delete<API>(this.url + 'api/organisations/' + organisationId, this.authService.getAuthOptions());
  }

  /**
   * Get all listings for this organisation
   * @param organisationId Organisation ID
   * @event GET
   */
  getAllListingsForAnOrganisation(organisationId: string): Observable<API> {
    return this.httpClient.get<API>(this.url + 'api/organisations/' + organisationId + '/listings', this.options);
  }

  /*
  getSelectedProgramme(programmeId: number): Observable<API> {
    return this.httpClient.get<API>(
      this.url + "api/organisations/" + programmeId,
      this.options
    );
  }

  createProgrammes(data: CreateProgrammes): Observable<HttpEvent<API>> {
    return this.httpClient.post<API>(
      this.url + "api/programmes",
      data,
      this.authService.OnlyAuthHttpHeaders, 
    );
  }

  updateProgrammes(programmeId: number, data: CreateProgrammes): Observable<HttpEvent<API>> {
    return this.httpClient.put<API>(
      this.url + "api/programmes/" + programmeId,
      data,
      this.authService.OnlyAuthHttpHeaders
    );
  }

  removeProgrammes(programmeId: number): Observable<API>  {
    return this.httpClient.delete<API>(
      this.url + "api/programmes/" + programmeId
    );
  }
  */
}
