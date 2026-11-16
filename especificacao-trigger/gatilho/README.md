# Gatilho

### Entidade principal e secundárias
| Entidade         | Papel      | Tag                                      | Tradução EN            |
| ---------------- | ---------- | ---------------------------------------- | ---------------------- |
| Gatilho          | Principal  | `portal.generic.label.trigger`           | Trigger                |
| Condição         | Secundária | `portal.measurementtype.label.condition` | Condition              |
| Categoria        | Secundária | `portal.generic.label.category`          | Category               |
| Ação             | Secundária | `portal.generic.label.action`            | Action                 |
| Webhook          | Secundária | `portal.generic.label.webhook`           | Webhook                |
| Placeholder      | Secundária | `portal.generic.label.placeholder`       | Placeholder            |
| Ordem de serviço | Secundária | `iclass.generic.label.service-order`     | Service order          |

### Glossário
| Termo               | Significado |
| ------------------- | ----------- |
| Gatilho             | Regra automática que executa ações quando as condições são atendidas. É a entidade principal desta especificação. |
| Condição            | Critério que decide se o gatilho é executado. É formada por Categoria, Operador e Valor. |
| Bloco "Todas"       | Bloco de condições em que todas precisam ser atendidas ("Todas as condições devem ser atendidas"). |
| Bloco "Qualquer"    | Bloco de condições em que basta uma ser atendida ("Qualquer condição deve ser atendida"). |
| Categoria           | Dado avaliado na condição, organizado em grupos (ex.: grupo "Ordem de serviço", categoria "Status"). O tipo da categoria (Lista, Número, Data ou Texto) define como o Valor é informado. |
| Operador            | Comparação feita na condição (ex.: Igual a, Alterado para, Presente). Alguns operadores não usam Valor. |
| Valor               | Valor com que a categoria é comparada. |
| Ação                | O que o gatilho faz quando as condições são atendidas. Hoje, só "Chamar webhook". |
| Webhook             | Chamada HTTP cadastrada, com URL, descrição, método e corpo modelo. |
| Corpo da requisição | Texto JSON enviado pelo webhook, editável na ação. |
| Placeholder         | Código no formato `{{caminho.do.dado}}` que, no corpo da requisição, representa um dado da ordem de serviço, do cliente ou do técnico. |
| Ordem de serviço    | Entidade cujos dados (como o Status) são avaliados nas condições. |
| Criação             | Página de cadastro de um novo gatilho. |
| Home                | Página de um gatilho específico; destino depois de criar um gatilho. Fora do escopo. |

### Pastas
| Pasta   | Componente                       | Papel              | Status   |
| ------- | -------------------------------- | ------------------ | -------- |
| criacao | `app-trigger-form`               | form               | definido |
| criacao | `app-trigger-condition-group`    | condition-group    | definido |
| criacao | `app-trigger-action`             | action             | definido |
| criacao | `app-trigger-json-editor`        | json-editor        | definido |
| criacao | `app-trigger-placeholders-panel` | placeholders-panel | definido |
| home    | `app-trigger-home`               | home               | pendente |

### Pendências
— (nenhuma)
