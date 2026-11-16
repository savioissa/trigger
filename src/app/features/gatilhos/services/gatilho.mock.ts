import { GrupoCategoria, GrupoPlaceholder, Placeholder, Webhook } from '../models/gatilho.model';

/* Dados fictícios usados pelo GatilhoService enquanto a API não existe.
   Os textos aqui simulam o que a API devolveria, por isso não passam pelo arquivo de tradução. */

const OS = 'Ordem de serviço';

export const CATEGORIAS_MOCK: GrupoCategoria[] = [
  {
    label: OS,
    itens: [
      {
        id: 'os.status',
        label: 'Status',
        grupo: OS,
        tipo: 'LISTA',
        valores: [
          { id: 'ABERTA', label: 'Aberta' },
          { id: 'AGENDADA', label: 'Agendada' },
          { id: 'ATENDIMENTO', label: 'Atendimento' },
          { id: 'APROVACAO', label: 'Aprovação' },
          { id: 'FILA_TECNICO', label: 'Fila técnico' },
          { id: 'DESLOCAMENTO', label: 'Deslocamento' },
          { id: 'DESPACHADA', label: 'Despachada' },
          { id: 'VINCULADA_CREDENCIADA', label: 'Vinculada credenciada' },
          { id: 'EM_ANALISE', label: 'Em análise' },
          { id: 'CONCLUIDA', label: 'Concluída' },
          { id: 'ENCERRADA', label: 'Encerrada' },
          { id: 'PARALISADA', label: 'Paralisada' },
          { id: 'PRE_ABERTA', label: 'Pré-aberta' },
          { id: 'SUPORTE', label: 'Suporte' }
        ]
      }
    ]
  }
];

export const WEBHOOKS_MOCK: Webhook[] = [
  {
    id: 'wh-sms-cliente',
    nome: 'Enviar SMS ao cliente',
    url: 'https://api.empresa.com/rest/v1/notify/sms',
    descricao: 'Dispara um SMS de atualização ao cliente',
    metodo: 'POST',
    corpoPadrao: [
      '{',
      '  "to": "{{os.cliente.telefone}}",',
      '  "message": "Sua OS {{os.id}} está {{os.status}}."',
      '}'
    ].join('\n')
  },
  {
    id: 'wh-email-cliente',
    nome: 'Enviar e-mail ao cliente',
    url: 'https://api.empresa.com/rest/v1/notify/email',
    descricao: 'Envia um e-mail com o resumo da OS ao cliente',
    metodo: 'POST',
    corpoPadrao: [
      '{',
      '  "to": "{{os.cliente.email}}",',
      '  "subject": "Atualização da OS {{os.id}}",',
      '  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."',
      '}'
    ].join('\n')
  },
  {
    id: 'wh-erp-os',
    nome: 'Atualizar OS no ERP',
    url: 'https://erp.empresa.com/api/ordens',
    descricao: 'Sincroniza status e valor da OS com o ERP',
    metodo: 'PUT',
    corpoPadrao: [
      '{',
      '  "id": "{{os.id}}",',
      '  "status": "{{os.status}}",',
      '  "valor": "{{os.valor_total}}"',
      '}'
    ].join('\n')
  },
  {
    id: 'wh-chat-equipe',
    nome: 'Avisar equipe no chat',
    url: 'https://hooks.chat.empresa.com/services/equipes',
    descricao: 'Publica uma mensagem no canal da equipe responsável',
    metodo: 'POST',
    corpoPadrao: [
      '{',
      '  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."',
      '}'
    ].join('\n')
  }
];

function placeholder(label: string, chave: string): Placeholder {
  return { label, chave, token: `{{${chave}}}` };
}

export const PLACEHOLDERS_MOCK: GrupoPlaceholder[] = [
  {
    id: 'os',
    label: OS,
    itens: [
      placeholder('ID da OS', 'os.id'),
      placeholder('Status', 'os.status'),
      placeholder('Equipe', 'os.equipe'),
      placeholder('Data de abertura', 'os.data_abertura'),
      placeholder('Data de conclusão', 'os.data_conclusao'),
      placeholder('Valor total', 'os.valor_total')
    ]
  },
  {
    id: 'cliente',
    label: 'Cliente',
    itens: [
      placeholder('Nome', 'os.cliente.nome'),
      placeholder('Telefone', 'os.cliente.telefone'),
      placeholder('E-mail', 'os.cliente.email'),
      placeholder('Endereço', 'os.cliente.endereco'),
      placeholder('Cidade', 'os.cliente.cidade')
    ]
  },
  {
    id: 'tecnico',
    label: 'Técnico',
    itens: [
      placeholder('Nome', 'os.tecnico.nome'),
      placeholder('Telefone', 'os.tecnico.telefone'),
      placeholder('E-mail', 'os.tecnico.email')
    ]
  }
];
