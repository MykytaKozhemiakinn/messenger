import { inject, Injectable } from '@angular/core';
import { ApiService } from '@common/services/api.service';
import { Observable } from 'rxjs';
import {
  AuthPayload,
  LoginPayload,
  SuccessAuthResponse,
} from '@auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiService: ApiService = inject(ApiService);

  public register(
    registerPayload: AuthPayload
  ): Observable<SuccessAuthResponse> {
    return this.apiService.post('/user/register', registerPayload);
  }

  public login(loginPayload: LoginPayload): Observable<SuccessAuthResponse> {
    return this.apiService.post('/user/login', loginPayload);
  }
}
