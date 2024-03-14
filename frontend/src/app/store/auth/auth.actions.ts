import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action-types.enum';
import {
  AuthPayload,
  LoginPayload,
  SuccessAuthResponse,
} from '@auth/models/auth.model';

export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{ loginPayload: LoginPayload }>()
);
export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ authData: SuccessAuthResponse }>()
);
export const loginFailure = createAction(AuthActionTypes.LOGIN_FAILURE);

export const register = createAction(
  AuthActionTypes.REGISTER,
  props<{ registerPayload: AuthPayload }>()
);
export const registerSuccess = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ authData: SuccessAuthResponse }>()
);
export const registerFailure = createAction(AuthActionTypes.REGISTER_FAILURE);

export const logout = createAction(AuthActionTypes.LOGOUT);
