import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../models/api';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from '../services/auth.service';

interface OptionObject {
  headers: HttpHeaders;
  authorization?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  /**
   * Upload file to S3
   * @param fd FormData with the files appended
   * @param headers authOptionsWithoutContentType
   * @event POST
   */
  uploadFile(fd: FormData): Observable<API> {
    return this.httpClient.post<API>(this.url + 'api/file-upload', fd, this.authService.getAuthOptionsWithoutContentType());
  }
}
