import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RegisterFormService } from '@auth/services/register-form.service';
import { AuthApiService } from '@auth/api/auth.api';
import { AuthService } from '@auth/services/auth.service';
import { UtilsService } from '@common/services/utils.service';
import { AuthPayload } from '@auth/models/auth.model';
import { TypedFormGroupModel } from '@common/models/typed-form-group.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass,
    FileUploadModule,
    AvatarModule,
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss'],
  // there is no other way to force p-avatar react on selectedImageUrlChanges
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [AuthService, UtilsService, MessageService],
})
export class RegisterComponent implements OnInit {
  private readonly registerFormService: RegisterFormService =
    inject(RegisterFormService);
  private readonly authApiService: AuthApiService = inject(AuthApiService);
  private readonly authService: AuthService = inject(AuthService);

  public passwordVisible: boolean = false;
  public showValidators: boolean = false;
  public selectedImage: Blob | undefined = undefined;
  public selectedImageUrl: string | undefined = undefined;
  public registerForm: TypedFormGroupModel<AuthPayload>;

  ngOnInit(): void {
    this.registerForm = this.registerFormService.initRegisterForm();
  }

  public register(form: { [x: string]: string | Blob }): void {
    const formData: FormData = new FormData();
    for (const field in form) {
      formData.append(field, form[field]);
    }
    this.authApiService
      .register(formData as unknown as AuthPayload)
      .subscribe();
  }

  public switchPasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public onFileSelected(event: Event): void {
    const input: HTMLInputElement | null = event.target as HTMLInputElement;
    const file: File | null = input.files[0];
    if (this.authService.isSelectedAvatarValid(file)) {
      this.selectedImage = file;
      this.generateImageUrl();
      this.registerForm.controls.avatar.setValue(file);
      return;
    }
  }

  private generateImageUrl(): void {
    const reader: FileReader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      this.selectedImageUrl = event.target.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
