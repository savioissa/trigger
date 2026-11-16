import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { TAG_TIPO_ACAO, TIPOS_ACAO, Webhook } from '../../models/gatilho.model';
import { AcaoForm, exibirErro } from '../../pages/trigger-form/trigger-form.factory';
import { TriggerJsonEditorComponent } from '../trigger-json-editor/trigger-json-editor.component';

let proximoId = 0;

/** Card de uma ação do tipo "Chamar webhook": escolha do webhook, detalhes e corpo da requisição. */
@Component({
  selector: 'app-trigger-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, TranslateModule, ButtonModule, DropdownModule, TriggerJsonEditorComponent],
  templateUrl: './trigger-action.component.html',
  styleUrl: './trigger-action.component.scss'
})
export class TriggerActionComponent {
  @Input({ required: true }) form!: AcaoForm;
  @Input() webhooks: Webhook[] = [];

  @Output() remover = new EventEmitter<void>();
  @Output() verPlaceholders = new EventEmitter<void>();

  protected readonly uid = `acao-${proximoId++}`;
  protected readonly tiposAcao = TIPOS_ACAO;
  protected readonly tagTipoAcao: Record<string, string> = TAG_TIPO_ACAO;
  protected readonly exibirErro = exibirErro;

  protected get webhook(): Webhook | undefined {
    const id = this.form.controls.webhookId.value;
    return this.webhooks.find(w => w.id === id);
  }

  /** Ao escolher outro webhook, o corpo é substituído pelo modelo sugerido dele. */
  protected aoMudarWebhook(): void {
    this.form.controls.corpo.setValue(this.webhook?.corpoPadrao ?? '');
  }
}
