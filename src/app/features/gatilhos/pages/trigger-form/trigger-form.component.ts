import { Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { finalize, forkJoin } from 'rxjs';

import { TriggerActionComponent } from '../../components/trigger-action/trigger-action.component';
import { TriggerConditionGroupComponent } from '../../components/trigger-condition-group/trigger-condition-group.component';
import { TriggerPlaceholdersPanelComponent } from '../../components/trigger-placeholders-panel/trigger-placeholders-panel.component';
import { GrupoCategoria, GrupoPlaceholder, STATUS_GATILHO, TAG_STATUS, Webhook } from '../../models/gatilho.model';
import { GatilhoService } from '../../services/gatilho.service';
import { criarAcaoForm, criarGatilhoForm, exibirErro, montarGatilho } from './trigger-form.factory';

@Component({
  selector: 'app-trigger-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    TooltipModule,
    TriggerConditionGroupComponent,
    TriggerActionComponent,
    TriggerPlaceholdersPanelComponent
  ],
  templateUrl: './trigger-form.component.html',
  styleUrl: './trigger-form.component.scss'
})
export class TriggerFormComponent implements OnInit {
  private readonly service = inject(GatilhoService);
  private readonly messages = inject(MessageService);
  private readonly translate = inject(TranslateService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected form = criarGatilhoForm();
  protected readonly statusOpcoes = STATUS_GATILHO;
  protected readonly tagStatus: Record<string, string> = TAG_STATUS;
  protected readonly exibirErro = exibirErro;

  protected readonly categorias = signal<GrupoCategoria[]>([]);
  protected readonly webhooks = signal<Webhook[]>([]);
  protected readonly placeholders = signal<GrupoPlaceholder[]>([]);

  protected readonly carregando = signal(true);
  protected readonly salvando = signal(false);
  protected readonly painelPlaceholdersAberto = signal(false);

  ngOnInit(): void {
    forkJoin({
      categorias: this.service.listarCategorias(),
      webhooks: this.service.listarWebhooks(),
      placeholders: this.service.listarPlaceholders()
    })
      .pipe(
        finalize(() => this.carregando.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ categorias, webhooks, placeholders }) => {
          this.categorias.set(categorias);
          this.webhooks.set(webhooks);
          this.placeholders.set(placeholders);
        },
        error: () => this.notificar('error', 'portal.generic.label.error-loading-data', 'portal.generic.label.unable-load-form-options')
      });
  }

  protected adicionarAcao(): void {
    this.form.controls.acoes.push(criarAcaoForm());
  }

  protected removerAcao(indice: number): void {
    this.form.controls.acoes.removeAt(indice);
  }

  protected cancelar(): void {
    // Sem histórico (acesso direto pela URL), não há para onde voltar: vai para a raiz.
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  protected criar(): void {
    // O botão já fica desabilitado nesses casos; a checagem protege contra chamadas fora do clique.
    if (this.form.invalid || this.salvando()) {
      return;
    }

    const gatilho = montarGatilho(this.form);
    this.salvando.set(true);

    this.service
      .criar(gatilho)
      .pipe(
        finalize(() => this.salvando.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: criado => {
          this.notificar('success', 'portal.generic.label.trigger-created', 'portal.generic.label.trigger-created-successfully');
          this.router.navigate(['/gatilhos', criado.id]);
        },
        error: () => this.notificar('error', 'portal.generic.label.error-creating-trigger', 'portal.generic.label.unable-create-trigger')
      });
  }

  private notificar(severity: 'success' | 'error', tituloChave: string, detalheChave: string): void {
    this.messages.add({
      severity,
      summary: this.translate.instant(tituloChave),
      detail: this.translate.instant(detalheChave)
    });
  }
}
