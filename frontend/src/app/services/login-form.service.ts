import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  public initLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: this.formBuilder.control<string>(null, Validators.required),
      password: this.formBuilder.control<string>(null, Validators.required),
    });
  }
}
