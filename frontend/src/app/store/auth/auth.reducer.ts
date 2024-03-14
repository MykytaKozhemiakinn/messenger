import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../auth/index';
import { SuccessAuthResponse } from '@auth/models/auth.model';

export const FeatureKey = 'auth';

export interface State {
  authData: SuccessAuthResponse | null;
}

const initialState: State = {
  authData: null,
};

export const AuthReducer = createReducer(
  initialState,

  on(AuthActions.login, (state): State => {
    return { ...state };
  }),
  on(AuthActions.loginSuccess, (_, { authData }): State => {
    return { authData };
  }),
  on(AuthActions.loginFailure, (state): State => {
    return { ...state };
  }),
  on(AuthActions.logout, (state): State => {
    return { ...state, authData: null };
  }),
  on(AuthActions.register, (state): State => {
    return { ...state };
  }),
  on(AuthActions.registerSuccess, (_, { authData }): State => {
    return { authData };
  }),
  on(AuthActions.registerFailure, (state): State => {
    return { ...state };
  }),
  on(AuthActions.logout, (state): State => {
    return { ...state, authData: null };
  })
);
