export type StatusGatilho = 'ATIVO' | 'INATIVO';
export const STATUS_GATILHO: StatusGatilho[] = ['ATIVO', 'INATIVO'];

/** Tag de tradução de cada status. */
export const TAG_STATUS: Record<StatusGatilho, string> = {
  ATIVO: 'portal.generic.label.active',
  INATIVO: 'portal.generic.label.inactive'
};

/** Tipo do dado da categoria: define o controle do campo "Valor". */
export type TipoCampo = 'LISTA' | 'TEXTO' | 'NUMERO' | 'DATA';

/** Operadores disponíveis para qualquer categoria, na ordem exibida no dropdown. */
export const OPERADORES = [
  'IGUAL',
  'DIFERENTE',
  'MAIOR_QUE',
  'MENOR_QUE',
  'ALTERADO',
  'NAO_ALTERADO',
  'ALTERADO_PARA',
  'NAO_ALTERADO_PARA',
  'ALTERADO_DE',
  'NAO_ALTERADO_DE',
  'PRESENTE',
  'AUSENTE'
] as const;

export type Operador = (typeof OPERADORES)[number];

/** Tag de tradução de cada operador. */
export const TAG_OPERADOR: Record<Operador, string> = {
  IGUAL: 'portal.generic.label.equal',
  DIFERENTE: 'portal.generic.label.operator-different',
  MAIOR_QUE: 'portal.generic.label.greater-than',
  MENOR_QUE: 'portal.generic.label.less-than',
  ALTERADO: 'portal.generic.label.operator-changed',
  NAO_ALTERADO: 'portal.generic.label.operator-not-changed',
  ALTERADO_PARA: 'portal.generic.label.operator-changed-to',
  NAO_ALTERADO_PARA: 'portal.generic.label.operator-not-changed-to',
  ALTERADO_DE: 'portal.generic.label.operator-changed-from',
  NAO_ALTERADO_DE: 'portal.generic.label.operator-not-changed-from',
  PRESENTE: 'portal.generic.label.operator-present',
  AUSENTE: 'portal.generic.label.operator-absent'
};

/** Operadores que não comparam com um valor: com eles o campo "Valor" fica desabilitado. */
export const OPERADORES_SEM_VALOR: readonly Operador[] = ['ALTERADO', 'NAO_ALTERADO', 'PRESENTE', 'AUSENTE'];

export function operadorExigeValor(operador: Operador | null): boolean {
  return operador != null && !OPERADORES_SEM_VALOR.includes(operador);
}

export interface OpcaoValor {
  id: string;
  label: string;
}

export interface CategoriaCondicao {
  id: string;
  /** Nome do campo dentro do grupo, ex.: "Status". */
  label: string;
  /** Nome do grupo a que pertence, ex.: "Ordem de serviço". Usado no texto do item selecionado. */
  grupo: string;
  tipo: TipoCampo;
  /** Só para categorias do tipo LISTA. */
  valores?: OpcaoValor[];
}

/** Grupo de categorias exibido no dropdown agrupado (cabeçalho + itens). */
export interface GrupoCategoria {
  label: string;
  itens: CategoriaCondicao[];
}

export type TipoAcao = 'WEBHOOK';
export const TIPOS_ACAO: TipoAcao[] = ['WEBHOOK'];

/** Tag de tradução de cada tipo de ação. */
export const TAG_TIPO_ACAO: Record<TipoAcao, string> = {
  WEBHOOK: 'portal.generic.label.get-webhook'
};

export type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Webhook {
  id: string;
  nome: string;
  url: string;
  descricao: string;
  metodo: MetodoHttp;
  /** Corpo sugerido, copiado para a ação quando o webhook é escolhido. */
  corpoPadrao: string;
}

export interface Placeholder {
  label: string;
  /** Caminho do dado, ex.: "os.id". */
  chave: string;
  /** Texto a usar no corpo, ex.: "{{os.id}}". */
  token: string;
}

export interface GrupoPlaceholder {
  id: string;
  label: string;
  itens: Placeholder[];
}

/** Valor de condição no payload: datas vão como "AAAA-MM-DD". */
export type ValorCondicao = string | number;

export interface Condicao {
  categoriaId: string;
  operador: Operador;
  /** `null` quando o operador não usa valor (Alterado, Não alterado, Presente, Ausente). */
  valor: ValorCondicao | null;
}

export interface Acao {
  tipo: TipoAcao;
  webhookId: string;
  corpo: string;
}

export interface Gatilho {
  id?: string;
  descricao: string;
  status: StatusGatilho;
  observacoes: string | null;
  condicoes: {
    /** Todas devem ser atendidas (E). */
    todas: Condicao[];
    /** Pelo menos uma deve ser atendida (OU). */
    qualquer: Condicao[];
  };
  acoes: Acao[];
}
