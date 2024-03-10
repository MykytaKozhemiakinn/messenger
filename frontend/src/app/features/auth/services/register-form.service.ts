import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationPayload } from '@auth/models/auth.model';
import { TypedFormGroupModel } from '@common/models/typed-form-group.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public initRegisterForm(): TypedFormGroupModel<RegistrationPayload> {
    return this.formBuilder.group({
      username: this.formBuilder.control<string>(null, Validators.required),
      email: this.formBuilder.control<string>(null, Validators.required),
      password: this.formBuilder.control<string>(null, Validators.required),
      confirmPassword: this.formBuilder.control<string>(
        null,
        Validators.required
      ),
      avatar: this.formBuilder.control<File>(null),
    });
  }
}
