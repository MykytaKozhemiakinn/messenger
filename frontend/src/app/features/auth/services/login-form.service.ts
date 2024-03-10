import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypedFormGroupModel } from '@common/models/typed-form-group.model';
import { LoginPayload } from '@auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public initLoginForm(): TypedFormGroupModel<LoginPayload> {
    return this.formBuilder.group({
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
    });
  }
}
