import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly baseUrl: string = environment.apiUrl;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
    }),
  };


  public get<T>(url: string, opt = {}): Observable<T> {
    const options = Object.assign(opt, this.httpOptions);
    return this.httpClient.get<T>(this.baseUrl + url, options);
  }

  public post<Req, Res>(url: string, req: Req, opt = {}): Observable<Res> {
    const options = Object.assign(opt, this.httpOptions);
    return this.httpClient
      .post<Res>(this.baseUrl + url, req, options)
      .pipe(catchError(error => throwError(error)));
  }

  public put<Req, Res>(url: string, req: Req, opt = {}): Observable<Res> {
    const options = Object.assign(opt, this.httpOptions);
    return this.httpClient
      .put<Res>(this.baseUrl + url, req, options)
      .pipe(catchError(error => throwError(error)));
  }

  public delete<T>(url: string, opt = {}): Observable<T> {
    const options = Object.assign(opt, this.httpOptions);
    return this.httpClient.delete<T>(this.baseUrl + url, options);
  }
}
