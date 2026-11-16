import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { CategoriaCondicao, GrupoCategoria, OPERADORES, Operador, TAG_OPERADOR, operadorExigeValor } from '../../models/gatilho.model';
import {
  CondicaoForm,
  criarCondicaoForm,
  exibirErro,
  sincronizarCamposCondicao
} from '../../pages/trigger-form/trigger-form.factory';

let proximoId = 0;

/** Um bloco de condições ("Todas..." ou "Qualquer..."), com a lista de linhas e o botão de adicionar. */
@Component({
  selector: 'app-trigger-condition-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule
  ],
  templateUrl: './trigger-condition-group.component.html',
  styleUrl: './trigger-condition-group.component.scss'
})
export class TriggerConditionGroupComponent {
  @Input({ required: true }) titulo = '';
  @Input({ required: true }) condicoes!: FormArray<CondicaoForm>;

  /** Categorias agrupadas, no formato do dropdown com grupos (cabeçalho + itens). */
  @Input()
  set gruposCategoria(grupos: GrupoCategoria[]) {
    this.grupos = grupos;
    this.categorias = grupos.flatMap(g => g.itens);
  }

  protected grupos: GrupoCategoria[] = [];
  private categorias: CategoriaCondicao[] = [];

  protected readonly operadores: Operador[] = [...OPERADORES];
  protected readonly tagOperador: Record<string, string> = TAG_OPERADOR;
  protected readonly uid = `condicao-${proximoId++}`;
  private readonly translate = inject(TranslateService);

  /** Idioma do usuário: define o formato do número (separador decimal e de milhar). */
  protected get idioma(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }
  protected readonly exibirErro = exibirErro;

  protected adicionar(): void {
    this.condicoes.push(criarCondicaoForm());
  }

  protected remover(indice: number): void {
    this.condicoes.removeAt(indice);
  }

  protected categoriaDe(condicao: CondicaoForm): CategoriaCondicao | undefined {
    const id = condicao.controls.categoriaId.value;
    return this.categorias.find(c => c.id === id);
  }

  /** Com o operador escolhido, o campo Valor não se aplica (Alterado, Não alterado, Presente, Ausente). */
  protected valorNaoSeAplica(condicao: CondicaoForm): boolean {
    return condicao.controls.categoriaId.value != null && !operadorExigeValor(condicao.controls.operador.value);
  }

  /**
   * Ao trocar a categoria: o valor anterior perde o sentido e é limpo; o operador é mantido
   * (a lista é a mesma para todas as categorias) ou, se ainda não houver, começa em "Igual a".
   */
  protected aoMudarCategoria(condicao: CondicaoForm): void {
    const { categoriaId, operador, valor } = condicao.controls;
    if (categoriaId.value != null && operador.value == null) {
      operador.setValue('IGUAL', { emitEvent: false });
    }
    valor.reset(null, { emitEvent: false });
    sincronizarCamposCondicao(condicao);
  }

  /** Ao trocar o operador: libera ou bloqueia o campo Valor conforme o operador usa valor. */
  protected aoMudarOperador(condicao: CondicaoForm): void {
    sincronizarCamposCondicao(condicao);
  }
}
