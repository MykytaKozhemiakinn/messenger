import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public initRegisterForm(): FormGroup {
    return this.formBuilder.group({
      username: this.formBuilder.control<string>(null, Validators.required),
      email: this.formBuilder.control<string>(null, Validators.required),
      password: this.formBuilder.control<string>(null, Validators.required),
      confirmPassword: this.formBuilder.control<string>(
        null,
        Validators.required
      ),
      avatar: this.formBuilder.control<File>(
        null,
      ),
    });
  }
}
