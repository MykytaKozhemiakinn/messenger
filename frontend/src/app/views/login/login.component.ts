import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { LoginFormService } from '../../services/login-form.service';

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

  public passwordVisible: boolean = false;
  public loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.loginFormService.initLoginForm();
  }

  public login(): void {}

  public switchPasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
