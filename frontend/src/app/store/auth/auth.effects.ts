import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './index';
import { LocalStorageService } from '@common/services/local-storage.service';
import { AuthApiService } from '@auth/api/auth.api';
import { AUTH } from '@common/constants/auth';
import { SuccessAuthResponse } from '@auth/models/auth.model';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginPayload }) => {
        return this.authApiService.login(loginPayload).pipe(
          map((authData: SuccessAuthResponse) => {
            this.localStorageService.setItem(AUTH, authData.token);
            return AuthActions.loginSuccess({ authData });
          }),
          catchError(() => {
            return of(AuthActions.loginFailure());
          })
        );
      })
    );
  });

  public register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ registerPayload }) => {
        return this.authApiService.register(registerPayload).pipe(
          map((authData: SuccessAuthResponse) => {
            this.localStorageService.setItem(AUTH, authData.token);
            return AuthActions.registerSuccess({ authData });
          }),
          catchError(() => {
            return of(AuthActions.registerFailure());
          })
        );
      })
    );
  });

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService
  ) {}
}
