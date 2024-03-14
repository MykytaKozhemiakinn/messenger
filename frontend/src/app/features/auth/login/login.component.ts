import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { LoginFormService } from '@auth/services/login-form.service';
import { LoginPayload } from '@auth/models/auth.model';
import { TypedFormGroupModel } from '@common/models/typed-form-group.model';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    NgClass,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly loginFormService: LoginFormService =
    inject(LoginFormService);
  private readonly store: Store = inject(Store);

  public passwordVisible: boolean = false;
  public loginForm: TypedFormGroupModel<LoginPayload>;

  ngOnInit(): void {
    this.loginForm = this.loginFormService.initLoginForm();
  }

  public login(loginFormValue: any): void {
    this.store.dispatch(AuthActions.login({ loginPayload: loginFormValue }));
  }

  public switchPasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
