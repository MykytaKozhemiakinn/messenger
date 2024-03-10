export interface AuthPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
}
export interface SuccessAuthResponse {
  successMessage: string;
  token: string;
}

export type LoginPayload = Pick<AuthPayload, 'email' | 'password'>;
