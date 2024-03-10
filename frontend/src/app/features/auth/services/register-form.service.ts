import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthPayload } from '@auth/models/auth.model';
import { TypedFormGroupModel } from '@common/models/typed-form-group.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public initRegisterForm(): TypedFormGroupModel<AuthPayload> {
    return this.formBuilder.group({
      username: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
      confirmPassword: this.formBuilder.control(null, Validators.required),
      avatar: this.formBuilder.control(null),
    });
  }
}
