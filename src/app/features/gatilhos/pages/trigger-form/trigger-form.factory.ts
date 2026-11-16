import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import {
  Acao,
  Condicao,
  Gatilho,
  Operador,
  StatusGatilho,
  TipoAcao,
  ValorCondicao,
  operadorExigeValor
} from '../../models/gatilho.model';

export type ValorCondicaoForm = string | number | Date | null;

export type CondicaoForm = FormGroup<{
  categoriaId: FormControl<string | null>;
  operador: FormControl<Operador | null>;
  valor: FormControl<ValorCondicaoForm>;
}>;

export type AcaoForm = FormGroup<{
  tipo: FormControl<TipoAcao>;
  webhookId: FormControl<string | null>;
  corpo: FormControl<string>;
}>;

export type GatilhoForm = FormGroup<{
  descricao: FormControl<string>;
  status: FormControl<StatusGatilho>;
  observacoes: FormControl<string>;
  condicoesTodas: FormArray<CondicaoForm>;
  condicoesQualquer: FormArray<CondicaoForm>;
  acoes: FormArray<AcaoForm>;
}>;

/** Campo de texto que não aceita só espaços. */
export const obrigatorioSemEspacos: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim() === '' ? { required: true } : Validators.required(control);

/** Aceita vazio (o "required" cuida disso); acusa erro quando o texto não é JSON válido. */
export const jsonValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const texto = control.value;
  if (typeof texto !== 'string' || texto.trim() === '') {
    return null;
  }
  try {
    JSON.parse(texto);
    return null;
  } catch {
    return { json: true };
  }
};

/**
 * Aplica os validadores só quando o campo irmão (no mesmo FormGroup) está preenchido.
 * Assim uma linha vazia não bloqueia o formulário, mas uma linha começada precisa ser completada.
 */
function quandoPreenchido(irmao: string, ...validadores: ValidatorFn[]): ValidatorFn {
  const validar = Validators.compose(validadores)!;
  return (control: AbstractControl): ValidationErrors | null =>
    control.parent?.get(irmao)?.value == null ? null : validar(control);
}

/** Condição "usada": tem categoria escolhida. Linhas sem categoria são ignoradas. */
function condicaoPreenchida(form: CondicaoForm): boolean {
  return form.controls.categoriaId.value != null;
}

/** Ação "usada": tem webhook escolhido. Cards sem webhook são ignorados. */
function acaoPreenchida(form: AcaoForm): boolean {
  return form.controls.webhookId.value != null;
}

/** Exige pelo menos uma condição com categoria, somando os dois grupos (E / OU). */
const peloMenosUmaCondicao: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as GatilhoForm;
  const condicoes = [...form.controls.condicoesTodas.controls, ...form.controls.condicoesQualquer.controls];
  return condicoes.some(condicaoPreenchida) ? null : { semCondicao: true };
};

/**
 * Operador e valor nascem desabilitados e só são liberados quando há categoria
 * (ver `sincronizarCamposCondicao`). Desabilitados, ficam fora da validação.
 */
export function criarCondicaoForm(): CondicaoForm {
  return new FormGroup({
    categoriaId: new FormControl<string | null>(null),
    operador: new FormControl<Operador | null>({ value: null, disabled: true }, Validators.required),
    valor: new FormControl<ValorCondicaoForm>({ value: null, disabled: true }, obrigatorioSemEspacos)
  });
}

/**
 * Mantém operador e valor coerentes com o que já foi escolhido:
 * - operador: habilitado só com categoria;
 * - valor: habilitado só com categoria e um operador que compare com valor
 *   (com Alterado, Não alterado, Presente ou Ausente ele é limpo e desabilitado).
 * Chamar sempre que a categoria ou o operador mudar.
 */
export function sincronizarCamposCondicao(form: CondicaoForm): void {
  const { operador, valor } = form.controls;
  const temCategoria = condicaoPreenchida(form);

  if (temCategoria) {
    operador.enable({ emitEvent: false });
  } else {
    operador.reset(null, { emitEvent: false });
    operador.disable({ emitEvent: false });
  }

  if (temCategoria && operadorExigeValor(operador.value)) {
    valor.enable();
  } else {
    valor.reset(null, { emitEvent: false });
    valor.disable();
  }
}

export function criarAcaoForm(): AcaoForm {
  return new FormGroup({
    tipo: new FormControl<TipoAcao>('WEBHOOK', { nonNullable: true, validators: Validators.required }),
    webhookId: new FormControl<string | null>(null),
    corpo: new FormControl<string>('', {
      nonNullable: true,
      validators: quandoPreenchido('webhookId', obrigatorioSemEspacos, jsonValido)
    })
  });
}

/**
 * Estado inicial: os dois blocos de condições sem linhas e nenhuma ação.
 * Obrigatórios: descrição e ao menos uma condição completa. Ações são opcionais.
 */
export function criarGatilhoForm(): GatilhoForm {
  return new FormGroup(
    {
      descricao: new FormControl('', { nonNullable: true, validators: obrigatorioSemEspacos }),
      status: new FormControl<StatusGatilho>('ATIVO', { nonNullable: true }),
      observacoes: new FormControl('', { nonNullable: true }),
      condicoesTodas: new FormArray<CondicaoForm>([]),
      condicoesQualquer: new FormArray<CondicaoForm>([]),
      acoes: new FormArray<AcaoForm>([])
    },
    { validators: peloMenosUmaCondicao }
  );
}

function paraValorPayload(valor: ValorCondicaoForm): ValorCondicao {
  if (valor instanceof Date) {
    const mes = String(valor.getMonth() + 1).padStart(2, '0');
    const dia = String(valor.getDate()).padStart(2, '0');
    return `${valor.getFullYear()}-${mes}-${dia}`;
  }
  return typeof valor === 'string' ? valor.trim() : (valor as number);
}

function paraCondicao(form: CondicaoForm): Condicao {
  const { categoriaId, operador, valor } = form.getRawValue();
  return {
    categoriaId: categoriaId!,
    operador: operador!,
    valor: operadorExigeValor(operador) ? paraValorPayload(valor) : null
  };
}

function paraAcao(form: AcaoForm): Acao {
  const { tipo, webhookId, corpo } = form.getRawValue();
  return { tipo, webhookId: webhookId!, corpo };
}

/** Converte o formulário (já validado) no payload enviado ao service. */
export function montarGatilho(form: GatilhoForm): Gatilho {
  const { descricao, status, observacoes } = form.getRawValue();
  return {
    descricao: descricao.trim(),
    status,
    observacoes: observacoes.trim() || null,
    condicoes: {
      todas: form.controls.condicoesTodas.controls.filter(condicaoPreenchida).map(paraCondicao),
      qualquer: form.controls.condicoesQualquer.controls.filter(condicaoPreenchida).map(paraCondicao)
    },
    acoes: form.controls.acoes.controls.filter(acaoPreenchida).map(paraAcao)
  };
}

/** Erro visível depois que o usuário interagiu com o campo. */
export function exibirErro(control: AbstractControl): boolean {
  return control.invalid && control.touched;
}
