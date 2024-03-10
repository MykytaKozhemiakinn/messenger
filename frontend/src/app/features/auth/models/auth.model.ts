export interface RegistrationResponse {
  successMessage: string;
  token: string;
}

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
}
