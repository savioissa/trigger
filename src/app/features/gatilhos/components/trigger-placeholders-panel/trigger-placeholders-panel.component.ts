import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { GrupoPlaceholder, Placeholder } from '../../models/gatilho.model';

@Component({
  selector: 'app-trigger-placeholders-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, ButtonModule, TabViewModule],
  templateUrl: './trigger-placeholders-panel.component.html',
  styleUrl: './trigger-placeholders-panel.component.scss'
})
export class TriggerPlaceholdersPanelComponent {
  @Input({ required: true }) grupos: GrupoPlaceholder[] = [];
  @Output() fechar = new EventEmitter<void>();

  private readonly translate = inject(TranslateService);
  private readonly messages = inject(MessageService);

  protected async copiar(item: Placeholder): Promise<void> {
    try {
      await navigator.clipboard.writeText(item.token);
      this.messages.add({
        severity: 'success',
        summary: this.translate.instant('portal.generic.label.copied'),
        detail: this.translate.instant('iclass.generic.label.copied-to-clipboard'),
        life: 2500
      });
    } catch {
      this.messages.add({
        severity: 'warn',
        summary: this.translate.instant('portal.generic.label.unable-to-copy'),
        detail: this.translate.instant('portal.generic.label.copy-placeholder-manually')
      });
    }
  }
}
