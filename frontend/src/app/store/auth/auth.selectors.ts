import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as AuthState, FeatureKey } from '../auth';

const selectAuthState = createFeatureSelector<AuthState>(FeatureKey);

export const jwt = createSelector(
  selectAuthState,
  (state): string | null => state.authData.token
);
export const isLoggedIn = createSelector(
  selectAuthState,
  (state): boolean => !!state.authData.token
);
