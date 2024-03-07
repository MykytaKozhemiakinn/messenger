import { inject, Injectable } from '@angular/core';
import { ApiService } from '@common/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiService: ApiService = inject(ApiService);

  public register(registerForm: any): Observable<any> {
    return this.apiService.post('/user/register', registerForm);
  }
}
