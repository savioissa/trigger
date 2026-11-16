# app-trigger-action

### Aplicação
Card de uma ação do gatilho, ou seja, o que acontece quando as condições são atendidas.
Hoje a única ação possível é chamar um webhook: o usuário escolhe um webhook cadastrado,
confere a URL, a descrição e o método dele e ajusta o corpo da requisição, podendo usar
placeholders. A lixeira ao lado do card remove a ação.

### Componentização
| Componente                | Tipo    | Onde é usado                                                                    |
| ------------------------- | ------- | ------------------------------------------------------------------------------- |
| `app-trigger-json-editor` | Interno | Corpo da requisição, quando há webhook escolhido (`app-trigger-json-editor.md`) |
| `p-dropdown`              | Externo | Campos "Tipo" e "Valor"                                                         |
| `p-button`                | Externo | Botão "Remover ação"                                                            |

### Elementos

#### Rótulo "Tipo"
- **Tag:** `portal.generic.label.type`
- **CSS:** `form-overline` (globais); associado ao campo Tipo.

#### Campo Tipo
- **Componente:** `p-dropdown`
- **CSS:** `campo` e `campo-painel` (globais)
- **Regras:** tem uma única opção, "Chamar webhook" (`portal.generic.label.get-webhook`), que
  já vem selecionada; o texto selecionado e o da lista usam a mesma tag.

#### Rótulo "Valor"
- **Tag:** `portal.generic.label.value`
- **CSS:** `form-overline` (globais); associado ao campo Webhook.

#### Campo Webhook
- **Tag:** `portal.generic.placeholder.select-webhook` (placeholder)
- **Componente:** `p-dropdown`, com busca
- **CSS:** `campo` e `campo-painel` (globais)
- **Comportamento:** ao abrir, exibe os webhooks pelo nome, com um campo de busca no topo
  da lista que filtra pelo nome; sem resultado na busca, ou sem nenhum webhook disponível, a
  lista mostra `portal.generic.results-not-found`. Ao escolher um webhook, o bloco de detalhes aparece e o corpo da
  requisição é substituído pelo corpo modelo desse webhook, sem aviso, mesmo que o usuário
  já tenha editado o corpo.
- **Regras:** opcional. Sem webhook escolhido, a ação não bloqueia o botão "Criar" e não é
  salva (ver `app-trigger-form.md` › Botão "Criar").
- **Origem do dado:** `--`

#### Bloco de detalhes do webhook
- **CSS:** `.acao__detalhes`; separado dos campos de cima por uma linha `#E5E7EB`.
- **Regras:** só aparece quando há um webhook escolhido; contém, nesta ordem, URL,
  Descrição, Método e Corpo da requisição.

#### Rótulo "URL"
- **Tag:** `portal.generic.label.url`
- **CSS:** `.acao__info-rotulo`

#### URL do webhook
- **CSS:** `.acao__url`; fonte monoespaçada; truncada com reticências em uma linha.
- **Origem do dado:** `--`

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `.acao__info-rotulo`

#### Descrição do webhook
- **CSS:** `.acao__info-valor`
- **Origem do dado:** `--`

#### Rótulo "Método"
- **Tag:** `portal.generic.label.method`
- **CSS:** `.acao__info-rotulo`

#### Selo do método
- **CSS:** `.metodo` e `.metodo--<método em minúsculas>`; texto em maiúsculas, monoespaçado.
- **Regras:** a cor depende do método: GET azul (`.metodo--get`), POST verde
  (`.metodo--post`), PUT amarelo (`.metodo--put`), PATCH roxo (`.metodo--patch`) e DELETE
  vermelho (`.metodo--delete`).
- **Origem do dado:** `--`

#### Rótulo "Corpo da requisição (JSON)"
- **Tag:** `portal.generic.label.request-body-json`
- **CSS:** `.acao__info-rotulo`; associado ao campo Corpo da requisição.

#### Corpo da requisição
- **Componente:** `app-trigger-json-editor`
- **Regras:** começa com o corpo modelo do webhook escolhido e pode ser editado livremente;
  com webhook escolhido, é obrigatório (só espaços não vale) e precisa ser um JSON válido;
  os placeholders são escritos como texto dentro do JSON (ex.: `"{{os.id}}"`); o editor
  entra no estado Inválido nas mesmas condições da mensagem de erro abaixo.
- **Origem do dado:** `--`

#### Mensagem de erro do corpo
- **Tag:** `portal.generic.label.required-field` (corpo vazio) ou
  `portal.generic.label.invalid-json` (JSON inválido)
- **CSS:** `form-error` (globais)
- **Regras:** só aparece depois que o usuário sai do campo com erro; some assim que o corpo
  fica válido; descreve o campo para leitores de tela.

#### Link "Visualizar placeholders disponíveis"
- **Tag:** `portal.generic.label.view-available-placeholders`
- **CSS:** `link-btn` (globais) e `.acao__placeholders`
- **Comportamento:** ao clicar, abre o painel de placeholders (ver Fluxo no `README.md` da
  página).

#### Botão "Remover ação"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--danger btn--text p-button-icon-only` (globais); `p-button-icon-only` é aplicada pelo PrimeNG em botão só com ícone.
- **Comportamento:** ao clicar, remove a ação imediatamente, sem confirmação (ver Fluxo no
  `README.md` da página).

### Layout
A ação é uma linha com duas colunas (`item-linha`, globais):

1. **Esquerda (ocupa o espaço restante):** o card (`item-card`, globais), organizado em uma
   coluna:
   1. **Seleção (topo):** Tipo e Valor lado a lado, em duas colunas de mesma largura, com
      14px entre elas; cada um é um `form-field` (globais): rótulo em cima e campo embaixo.
   2. **Detalhes (abaixo, só com webhook escolhido):** URL, Descrição, Método e Corpo da
      requisição empilhados, com 18px entre eles; o link "Visualizar placeholders
      disponíveis" fica logo abaixo do corpo, alinhado à esquerda. O corpo, seu rótulo, a mensagem de erro e o link formam um `form-field` (globais).
2. **Direita (32px):** botão "Remover ação", centralizado na altura do card.

### Estados
| Estado         | Quando                                                     | O que deve ser exibido                                                                            |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Sem webhook    | Nenhum webhook escolhido                                   | Só Tipo e Valor, com o placeholder `portal.generic.placeholder.select-webhook`                    |
| Com webhook    | Um webhook escolhido                                       | Tipo, Valor e o bloco de detalhes com o corpo modelo                                              |
| Corpo inválido | Com webhook, o corpo está vazio ou não é JSON válido e o usuário já saiu do campo | Editor no estado Inválido e a mensagem de erro do corpo                     |

### Comportamentos
- **Dado** uma ação com webhook e o corpo editado pelo usuário, **quando** o usuário escolhe
  outro webhook, **então** URL, descrição e método passam a ser os do novo webhook e o corpo
  é substituído pelo corpo modelo dele, sem aviso.

### CSS
| Classe              | Definição |
| ------------------- | --------- |
| :host               | display: block; |
| .acao               | display: flex;<br>flex-direction: column; |
| .acao__selecao      | display: grid;<br>grid-template-columns: repeat(2, minmax(0, 1fr));<br>align-items: start;<br>gap: 14px; |
| .acao__detalhes     | display: flex;<br>flex-direction: column;<br>gap: 18px;<br>margin-top: 18px;<br>padding-top: 20px;<br>border-top: 1px solid #E5E7EB; |
| .acao__info         | display: flex;<br>flex-direction: column;<br>align-items: flex-start;<br>gap: 6px;<br>min-width: 0; |
| .acao__info-rotulo  | font: var(--label-field);<br>color: #1F2937; |
| .acao__info-valor   | font: var(--secondary-md);<br>color: #4B5563; |
| .acao__url          | max-width: 100%;<br>overflow: hidden;<br>font: 400 13px/20px ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;<br>color: #1F2937;<br>text-overflow: ellipsis;<br>white-space: nowrap; |
| .acao__placeholders | align-self: flex-start;<br>margin-top: 4px; |
| .metodo             | display: inline-flex;<br>align-items: center;<br>height: 22px;<br>padding: 0 8px;<br>border: 1px solid;<br>border-radius: 4px;<br>font: 600 11px/1 ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;<br>letter-spacing: .02em; |
| .metodo--get        | background: #EFF6FF;<br>border-color: #BFDBFE;<br>color: #1D4ED8; |
| .metodo--post       | background: #F0FDF4;<br>border-color: #86EFAC;<br>color: #15803D; |
| .metodo--put        | background: #FFFBEB;<br>border-color: #FCD34D;<br>color: #B45309; |
| .metodo--patch      | background: #F5F3FF;<br>border-color: #C4B5FD;<br>color: #6D28D9; |
| .metodo--delete     | background: #FEF2F2;<br>border-color: #FCA5A5;<br>color: #B91C1C; |
