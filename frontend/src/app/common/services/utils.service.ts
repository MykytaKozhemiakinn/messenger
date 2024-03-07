import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageSeverityModel } from '@common/models/message-severity.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly messageService: MessageService = inject(MessageService);

  public showMessage(
    severity: MessageSeverityModel,
    summary: string,
    detail: string
  ): void {
    this.messageService.clear();
    this.messageService.add({
      severity,
      summary,
      detail,
      sticky: true,
    });
  }
}
