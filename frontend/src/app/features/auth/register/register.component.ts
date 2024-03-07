import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { UtilsService } from '@common/services/utils.service';
import { MessageService } from 'primeng/api';
import { RegisterFormService } from '@auth/services/register-form.service';
import {
  invalidFileTypeContent,
  invalidFileTypeHeader,
  tooHeavyFileContent,
  tooHeavyFileHeader,
} from '@common/constants/toast-content';
import { AuthApiService } from '@auth/api/auth.api';

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
  providers: [UtilsService, MessageService],
})
export class RegisterComponent implements OnInit {
  private readonly utilsService: UtilsService = inject(UtilsService);
  private readonly registerFormService: RegisterFormService =
    inject(RegisterFormService);
  private readonly authApiService: AuthApiService = inject(AuthApiService);

  public passwordVisible: boolean = false;
  public showValidators: boolean = false;
  public selectedImage: Blob | undefined = undefined;
  public selectedImageUrl: string | undefined = undefined;
  public registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.registerFormService.initRegisterForm();
  }

  public register(form: FormGroup): void {
    this.authApiService.register(form).subscribe();
  }

  public switchPasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public onFileSelected(event: Event): void {
    const input: HTMLInputElement | null = event.target as HTMLInputElement;
    const file: File | null = input.files[0];
    if (this.isValidFile(file)) {
      this.selectedImage = file;
      this.generateImageUrl();
      this.registerForm.controls.avatar.setValue(file);
      return;
    }
  }

  private isValidFile(file: File): boolean {
    const allowedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxFileSize: number = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      this.utilsService.showMessage(
        'error',
        invalidFileTypeHeader,
        invalidFileTypeContent
      );
      return false;
    }
    if (file.size > maxFileSize) {
      this.utilsService.showMessage(
        'error',
        tooHeavyFileHeader,
        tooHeavyFileContent
      );
      return false;
    }
    return true;
  }

  private generateImageUrl(): void {
    const reader: FileReader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      this.selectedImageUrl = event.target.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
