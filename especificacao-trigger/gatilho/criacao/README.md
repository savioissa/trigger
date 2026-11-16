# Gatilho — criação

### Propósito
Cadastra um novo gatilho. Permite ao usuário descrever o gatilho, definir as condições que
fazem ele ser executado (todas precisam ser atendidas, ou basta uma) e as ações que ele
executa (hoje, chamar um webhook com um corpo de requisição que pode usar placeholders).

### Componentização
| Componente                       | Tipo    | Papel na página                                                                                          |
| -------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `app-trigger-form`               | Interno | Contêiner da página: cabeçalho com Cancelar e Criar, dados gerais e seções Condições e Ações.           |
| `app-trigger-condition-group`    | Interno | Bloco de condições. Aparece duas vezes: "Todas" e "Qualquer".                                           |
| `app-trigger-action`             | Interno | Configura uma ação (webhook e corpo). Repete-se para cada ação.                                         |
| `app-trigger-json-editor`        | Interno | Campo do corpo da requisição, dentro de cada ação com webhook.                                          |
| `app-trigger-placeholders-panel` | Interno | Painel opcional à direita das ações. Lista e copia os placeholders.                                     |
| `p-toast`                        | Externo | Mensagens de sucesso e erro da página e do painel.                                                      |

### Layout
A página é dividida em duas partes:

1. **Cabeçalho (topo, fixo ao rolar):** título da página e os botões "Cancelar" e "Criar".
2. **Conteúdo (abaixo, rolável):** dados gerais; seção Condições, com os dois
   `app-trigger-condition-group` empilhados ("Todas" acima de "Qualquer"); seção Ações, com
   os `app-trigger-action` empilhados e o botão "Adicionar ação". As seções são separadas
   por divisores.

Quando aberto, o `app-trigger-placeholders-panel` fica à direita dos `app-trigger-action`,
alinhado ao topo da primeira ação, e acompanha a rolagem logo abaixo do cabeçalho. As
ações estreitam para dar espaço a ele.

### Fluxo entre os componentes
- **Dado** a página aberta, **quando** as opções terminam de carregar, **então**
  `app-trigger-form` entrega as categorias aos dois `app-trigger-condition-group`, os
  webhooks a cada `app-trigger-action` e os placeholders ao
  `app-trigger-placeholders-panel`.
- **Dado** qualquer estado, **quando** o usuário adiciona, remove ou preenche uma condição
  em `app-trigger-condition-group`, **então** `app-trigger-form` reavalia se o botão
  "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário edita o corpo em `app-trigger-json-editor`,
  **então** `app-trigger-action` valida o corpo (obrigatório e JSON válido) e
  `app-trigger-form` reavalia se o botão "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário clica em "Remover ação" em `app-trigger-action`
  (saída `remover`), **então** `app-trigger-form` remove a ação da lista, sem confirmação,
  e reavalia o botão "Criar".
- **Dado** uma ação com webhook, **quando** o usuário clica em "Visualizar placeholders
  disponíveis" em `app-trigger-action` (saída `verPlaceholders`), **então**
  `app-trigger-form` abre o `app-trigger-placeholders-panel` à direita das ações; se o
  painel já estiver aberto, ele continua aberto como está.
- **Dado** o painel aberto, **quando** o usuário clica em "Fechar" em
  `app-trigger-placeholders-panel` (saída `fechar`), **então** `app-trigger-form` fecha o
  painel e as ações voltam a ocupar a largura toda.
- **Dado** o painel aberto, **quando** o usuário copia um placeholder em
  `app-trigger-placeholders-panel`, **então** o código vai para a área de transferência e o
  usuário o cola no corpo de qualquer `app-trigger-action`; o painel não escreve no corpo.

### Referências visuais
— (não se aplica: o time optou por não anexar prints a esta especificação)
