import { inject, Injectable } from '@angular/core';
import {
  invalidFileTypeContent,
  invalidFileTypeHeader,
  tooHeavyFileContent,
  tooHeavyFileHeader,
} from '@common/constants/toast-content';
import { UtilsService } from '@common/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly utilsService: UtilsService = inject(UtilsService);

  public isSelectedAvatarValid(file: File): boolean {
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
}
