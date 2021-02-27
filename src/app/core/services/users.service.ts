import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../models/api';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface OptionObject {
  headers: HttpHeaders;
  authorization?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = environment.apiUrl;
  private options: OptionObject = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Gets all listings owned by user
   * @param userId User ID
   * @event GET
   */
  getOwnedListings(userId: string): Observable<API> {
    return this.httpClient.get<API>(this.url + 'api/users/' + userId + '/listings/owner', this.options);
  }

  /**
   * Gets all listings liked by user
   * @param userId User ID
   * @event GET
   */
  getLikedListing(userId: string): Observable<API> {
    return this.httpClient.get<API>(this.url + 'api/users/' + userId + '/likes', this.options);
  }
}
