# app-trigger-form

### Aplicação
Contêiner da página de criação de gatilho. Organiza o cabeçalho com as ações "Cancelar" e
"Criar", os dados gerais do gatilho (Descrição, Status e Observações) e as seções Condições
e Ações, e decide quando o gatilho pode ser criado. Além de organizar a página, é dono dos
dados gerais.

### Componentização
| Componente                       | Tipo    | Onde é usado                                                                                       |
| -------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `app-trigger-condition-group`    | Interno | Dois na seção Condições: bloco "Todas" e bloco "Qualquer" (`app-trigger-condition-group.md`)       |
| `app-trigger-action`             | Interno | Um por ação na seção Ações (`app-trigger-action.md`)                                               |
| `app-trigger-placeholders-panel` | Interno | À direita das ações, quando o painel está aberto (`app-trigger-placeholders-panel.md`)             |
| `p-button`                       | Externo | Botões "Cancelar", "Criar" e "Adicionar ação"                                                      |
| `p-tooltip`                      | Externo | Tooltip do botão "Criar" desabilitado                                                              |
| `p-dropdown`                     | Externo | Campo Status                                                                                       |
| `pInputText`                     | Externo | Campo Descrição                                                                                    |
| `pInputTextarea`                 | Externo | Campo Observações                                                                                  |
| `p-toast`                        | Externo | Mensagens de sucesso e erro (o `p-toast` fica na raiz da aplicação, no canto superior direito, abaixo do cabeçalho: `p-toast-top-right`, globais) |

### Elementos

#### Título da página
- **Tag:** `portal.generic.label.new-trigger`
- **CSS:** `t-title-lg` (globais) e `.pagina__titulo`; h1.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, volta para a tela anterior, sem confirmação e sem salvar. Se
  a página foi aberta direto pelo endereço, sem tela anterior, vai para a página inicial da
  aplicação.

#### Botão "Criar"
- **Tag:** `portal.generic.button.create`
- **Componente:** `p-button`, dentro de um contêiner com `p-tooltip`
- **CSS:** `btn--md btn--primary` (globais); desabilitado, com a aparência de `.p-button:disabled` (globais); contêiner `.pagina__criar`.
- **Comportamento:** ao clicar, cria o gatilho. Durante o salvamento, o botão mostra o
  indicador de carregamento e fica desabilitado. Com sucesso, exibe o toast de sucesso com o
  título `portal.generic.label.trigger-created` e o texto
  `portal.generic.label.trigger-created-successfully` e vai para a home do gatilho criado
  (`app-trigger-home`, página fora do escopo; na casca, o endereço provisório é
  `/gatilhos/<id do gatilho criado>`). Com falha,
  exibe o toast de erro com o título `portal.generic.label.error-creating-trigger` e o
  texto `portal.generic.label.unable-create-trigger`, e o usuário continua na página com os
  dados preenchidos. Ao passar o mouse sobre o botão desabilitado, exibe à esquerda o
  tooltip `portal.generic.label.create-trigger-requirements` (`tooltip--largo`, globais).
- **Regras:**
  - Habilitado só quando, ao mesmo tempo: a descrição está preenchida (só espaços não
    vale); há ao menos uma condição com categoria, em qualquer um dos dois blocos; e nenhum
    campo habilitado está inválido (Operador e Valor de linhas com categoria; Corpo da
    requisição de ações com webhook).
  - Ações não são obrigatórias.
  - O que é salvo: a descrição e as observações sem espaços nas pontas (observações vazias
    não são salvas); o status; as condições de cada bloco que têm categoria; as ações que
    têm webhook. Linhas sem categoria e ações sem webhook são descartadas.
  - Condições com operador que não usa valor são salvas sem valor.

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `form-label` (globais); seguido de um asterisco vermelho (`form-label__required`,
  globais), oculto para leitores de tela.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.trigger-description` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `campo` (globais); com erro, `campo--invalido` (globais).
- **Regras:** obrigatório; só espaços não vale; sem limite de caracteres. Vazio, exibe
  abaixo `portal.generic.label.required-field` (`form-error`, globais), que descreve o
  campo para leitores de tela, depois que o usuário sai do campo.
- **Origem do dado:** `--`

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `form-label` (globais)

#### Campo Status
- **Componente:** `p-dropdown`
- **CSS:** `campo` e `campo-painel` (globais)
- **Regras:** opções "Ativo" (`portal.generic.label.active`) e "Inativo"
  (`portal.generic.label.inactive`), nessa ordem; começa em "Ativo"; o texto selecionado e o
  da lista usam a mesma tag.
- **Origem do dado:** `--`

#### Rótulo "Observações"
- **Tag:** `portal.generic.label.notes`
- **CSS:** `form-label` (globais)

#### Campo Observações
- **Tag:** `portal.generic.placeholder.trigger-notes` (placeholder)
- **Componente:** `pInputTextarea`
- **CSS:** `campo-textarea` (globais); altura inicial de 3 linhas, redimensionável na
  vertical.
- **Regras:** opcional; sem limite de caracteres.
- **Origem do dado:** `--`

#### Divisor
- **CSS:** `.divisor`; separa os dados gerais da seção Condições e a seção Condições da
  seção Ações.

#### Título "Condições"
- **Tag:** `portal.generic.label.conditions`
- **CSS:** `t-title-sm` (globais) e `.secao__titulo`; h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Condições"
- **Tag:** `portal.generic.label.conditions-set-trigger-execution`
- **CSS:** `.secao__subtitulo`

#### Bloco "Todas"
- **Componente:** `app-trigger-condition-group`, com o título
  `portal.generic.label.all-conditions-satisfied`

#### Bloco "Qualquer"
- **Componente:** `app-trigger-condition-group`, com o título
  `portal.generic.label.any-condition-satisfied`

#### Título "Ações"
- **Tag:** `portal.generic.label.actions`
- **CSS:** `t-title-sm` (globais) e `.secao__titulo`; h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Ações"
- **Tag:** `portal.generic.label.define-trigger-actions`
- **CSS:** `.secao__subtitulo`

#### Lista de ações
- **Componente:** `app-trigger-action`, um por ação
- **CSS:** `.acoes__lista`; 12px entre os itens.
- **Regras:** as ações aparecem na ordem em que foram adicionadas; sem limite de
  quantidade.

#### Botão "Adicionar ação"
- **Tag:** `portal.generic.label.add-action`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--dashed` (globais)
- **Comportamento:** ao clicar, adiciona uma ação vazia (sem webhook) ao fim da lista.

#### Painel de placeholders
- **Componente:** `app-trigger-placeholders-panel`
- **CSS:** `.acoes__painel`
- **Regras:** só aparece quando está aberto (ver Fluxo no `README.md` da página); tem 450px
  de largura; ao rolar a página, fica fixo 16px abaixo do cabeçalho.

### Layout
A página ocupa a altura toda da tela, com fundo branco, e tem duas partes:

1. **Cabeçalho (topo, fixo ao rolar, 68px de altura, linha inferior `#E5E7EB`):** título à
   esquerda; botões "Cancelar" e "Criar" à direita, com 10px entre eles.
2. **Conteúdo (abaixo do cabeçalho, largura toda, margem interna de 28px nas laterais e no
   topo e 64px embaixo):**
   1. **Dados gerais:** grade de duas colunas de mesma largura, com 20px entre colunas e
      18px entre linhas: Descrição à esquerda e Status à direita; Observações embaixo,
      ocupando as duas colunas. Cada campo é um `form-field` (globais): rótulo em cima, campo e mensagem de erro
      embaixo.
   2. **Divisor.**
   3. **Seção Condições:** título e subtítulo; bloco "Todas"; bloco "Qualquer". 28px entre
      esses itens.
   4. **Divisor.**
   5. **Seção Ações:** título e subtítulo; abaixo, a lista de ações seguida do botão
      "Adicionar ação". Com o painel de placeholders aberto, essa área vira duas colunas:
      a lista à esquerda (ocupa o espaço restante) e o painel à direita (450px), com 20px
      entre elas, alinhados pelo topo.

### Estados
| Estado                   | Quando                                                              | O que deve ser exibido                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Carregando               | Enquanto as categorias, os webhooks e os placeholders são buscados  | Cabeçalho normal, com "Criar" desabilitado. No conteúdo, com `aria-busy="true"`, todos os blocos viram skeleton (`skeleton`, globais), ocultos para leitores de tela: dados gerais com dois rótulos e campos lado a lado e um rótulo com campo de 80px na largura toda; seção Condições com título, subtítulo e dois blocos de 88px; seção Ações com título, subtítulo e um bloco de 88px; os divisores continuam entre as seções |
| Padrão                   | Opções carregadas, nada preenchido                                  | Campos vazios, Status "Ativo", os dois blocos de condições sem linhas e nenhuma ação; "Criar" desabilitado, com tooltip              |
| Pronto para criar        | Regras do botão "Criar" atendidas                                   | "Criar" habilitado, sem tooltip                                                                                                              |
| Campo com erro           | Um campo obrigatório ficou vazio ou inválido e o usuário saiu dele  | Borda vermelha e mensagem de erro abaixo do campo; "Criar" desabilitado                                                                     |
| Salvando                 | Depois do clique em "Criar", até a resposta                         | "Criar" com indicador de carregamento e desabilitado                                                                                        |
| Erro ao salvar           | A criação falhou                                                    | Toast de erro (`portal.generic.label.error-creating-trigger` / `portal.generic.label.unable-create-trigger`); dados mantidos                 |
| Erro ao carregar opções  | A busca das categorias, dos webhooks ou dos placeholders falhou     | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-form-options`; a página continua aberta, sem opções nos campos que dependem delas |

### Comportamentos
- **Dado** qualquer campo obrigatório, **quando** o usuário ainda não interagiu com ele,
  **então** nenhum erro é exibido, mesmo com o campo vazio; o erro só aparece depois que o
  usuário sai do campo com o valor inválido.
- **Dado** o foco em qualquer campo da página, **quando** o usuário pressiona Enter,
  **então** nada é criado: o gatilho só é criado pelo clique no botão "Criar".

### CSS
| Classe                          | Definição |
| ------------------------------- | --------- |
| :host                           | --cabecalho-altura: 68px;<br>display: block;<br>min-height: 100vh;<br>background: #fff; |
| .pagina__cabecalho              | position: sticky;<br>top: 0;<br>z-index: 10;<br>display: flex;<br>align-items: center;<br>justify-content: space-between;<br>gap: 16px;<br>height: var(--cabecalho-altura);<br>padding: 0 28px;<br>background: #fff;<br>border-bottom: 1px solid #E5E7EB;<br>box-sizing: border-box; |
| .pagina__titulo                 | margin: 0;<br>color: #1E293B; |
| .pagina__botoes                 | display: flex;<br>gap: 10px; |
| .pagina__criar                  | display: inline-flex; |
| .pagina__criar .p-button:disabled | pointer-events: none; |
| .pagina__conteudo               | padding: 28px 28px 64px; |
| .dados                          | display: grid;<br>grid-template-columns: repeat(2, minmax(0, 1fr));<br>gap: 18px 20px; |
| .dados__largo                   | grid-column: 1 / -1; |
| .divisor                        | margin: 40px 0 32px;<br>border: 0;<br>border-top: 1px solid #EEF0F3; |
| .secao                          | display: flex;<br>flex-direction: column;<br>gap: 28px; |
| .secao__cabecalho               | display: flex;<br>flex-direction: column;<br>gap: 6px;<br>margin-bottom: 4px; |
| .secao__titulo                  | margin: 0;<br>color: #1E293B; |
| .secao__subtitulo               | margin: 0;<br>font: var(--secondary-md);<br>color: #4B5563; |
| .acoes                          | display: grid;<br>grid-template-columns: minmax(0, 1fr);<br>align-items: start;<br>gap: 20px; |
| .acoes--com-painel              | grid-template-columns: minmax(0, 1fr) 450px; |
| .acoes__lista                   | display: flex;<br>flex-direction: column;<br>gap: 12px; |
| .acoes__painel                  | position: sticky;<br>top: calc(var(--cabecalho-altura) + 16px); |
| .esqueleto__campo               | display: flex;<br>flex-direction: column;<br>gap: 6px; |
| .esqueleto__rotulo              | width: 96px;<br>height: 14px; |
| .esqueleto__input               | height: 40px;<br>border-radius: 6px; |
| .esqueleto__textarea            | height: 80px;<br>border-radius: 6px; |
| .esqueleto__titulo              | width: 140px;<br>height: 20px; |
| .esqueleto__subtitulo           | width: 320px;<br>height: 14px; |
| .esqueleto__bloco               | height: 88px;<br>border-radius: 8px; |
