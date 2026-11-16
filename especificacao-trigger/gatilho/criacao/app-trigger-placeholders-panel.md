# app-trigger-placeholders-panel

### Aplicação
Painel lateral que lista os placeholders que podem ser usados no corpo da requisição de uma
ação, agrupados por abas (por exemplo, Ordem de serviço, Cliente e Técnico). Permite ao
usuário consultar o nome e o código de cada placeholder e copiar o código para colá-lo no
corpo.

### Componentização

| Componente    | Tipo    | Onde é usado                                     |
| ------------- | ------- | ------------------------------------------------ |
| `p-button`    | Externo | Botão "Fechar" e botão "Copiar" de cada item     |
| `p-tabView`   | Externo | Abas dos grupos de placeholders                  |
| `p-tabPanel`  | Externo | Uma aba por grupo                                |

### Elementos

#### Título do painel
- **Tag:** `portal.generic.label.available-placeholders`
- **CSS:** `.painel__titulo`; h3.

#### Botão "Fechar"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-times`
- **CSS:** `btn--md btn--text icon-neutral p-button-icon-only` (globais) e `p-button-text` (PrimeNG); `p-button-icon-only` é aplicada pelo PrimeNG em botão só com ícone.
- **Comportamento:** ao clicar, fecha o painel (ver Fluxo no `README.md` da página).

#### Abas dos grupos
- **Componente:** `p-tabView`, com um `p-tabPanel` por grupo
- **CSS:** `placeholders-tabs` (globais)
- **Comportamento:** ao clicar numa aba, exibe os placeholders daquele grupo.
- **Regras:** os grupos aparecem na ordem em que chegam; a primeira aba fica selecionada
  sempre que o painel é aberto; o nome da aba é o nome do grupo.
- **Origem do dado:** `--`

#### Nome do placeholder
- **CSS:** `.painel__label`
- **Regras:** um por placeholder do grupo selecionado, na ordem em que chegam.
- **Origem do dado:** `--`

#### Código do placeholder
- **CSS:** `.painel__token`; fonte monoespaçada; truncado com reticências em uma linha.
- **Regras:** exibido no formato `{{caminho.do.dado}}` (ex.: `{{os.id}}`); um clique
  seleciona o código inteiro.
- **Origem do dado:** `--`

#### Botão "Copiar"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-copy`
- **CSS:** `btn--md btn--text icon-neutral p-button-icon-only` (globais) e `p-button-text` (PrimeNG); `p-button-icon-only` é aplicada pelo PrimeNG em botão só com ícone.
- **Comportamento:** ao clicar, copia o código do placeholder para a área de transferência
  e exibe um toast de sucesso por 2,5 segundos, com o título `portal.generic.label.copied`
  e o texto `iclass.generic.label.copied-to-clipboard`. Se a cópia falhar, exibe um toast de
  aviso com o título `portal.generic.label.unable-to-copy` e o texto
  `portal.generic.label.copy-placeholder-manually`. Os textos dos toasts são fixos, sem o
  código do placeholder.

### Layout
Card com borda, cantos arredondados e sombra leve, organizado em uma coluna:

1. **Cabeçalho (topo):** título à esquerda e botão "Fechar" à direita, alinhados ao centro.
2. **Abas (abaixo do cabeçalho, largura toda):** nomes dos grupos lado a lado, com uma linha
   inferior de largura total.
3. **Lista (abaixo das abas):** um item por placeholder. Cada item é uma linha com o nome
   em cima e o código embaixo, à esquerda, e o botão "Copiar" à direita, alinhado ao centro.

### Estados
| Estado          | Quando                                  | O que deve ser exibido                                          |
| --------------- | --------------------------------------- | --------------------------------------------------------------- |
| Padrão          | Painel aberto                           | Primeira aba selecionada e seus placeholders                    |
| Aba selecionada | O usuário clicou em uma aba             | Aba com texto `#2563EB` e linha inferior `#3B82F6`; itens dela  |
| Hover no item   | Cursor sobre um item da lista           | Fundo do item `#F8FAFC`                                         |

### Comportamentos
- **Dado** o painel aberto em uma aba que não é a primeira, **quando** o usuário fecha e
  abre o painel de novo, **então** o painel volta a abrir na primeira aba.

### CSS
| Classe              | Definição |
| ------------------- | --------- |
| :host               | display: block; |
| .painel             | overflow: hidden;<br>background: #fff;<br>border: 1px solid #E5E7EB;<br>border-radius: 10px;<br>box-shadow: 0 2px 6px rgba(16, 24, 40, .08); |
| .painel__cabecalho  | display: flex;<br>align-items: center;<br>justify-content: space-between;<br>gap: 12px;<br>padding: 12px 12px 12px 16px; |
| .painel__titulo     | margin: 0;<br>font: 500 14px/21px var(--font-family-text);<br>color: #1F2937; |
| .painel__lista      | margin: 0;<br>padding: 0;<br>list-style: none; |
| .painel__item       | display: flex;<br>align-items: center;<br>justify-content: space-between;<br>gap: 12px;<br>padding: 8px 12px 8px 20px; |
| .painel__item:hover | background: #F8FAFC; |
| .painel__texto      | display: flex;<br>flex-direction: column;<br>gap: 2px;<br>min-width: 0; |
| .painel__label      | font: var(--secondary-md);<br>color: #1F2937; |
| .painel__token      | overflow: hidden;<br>font: 400 12px/16px ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;<br>color: #6B7280;<br>text-overflow: ellipsis;<br>white-space: nowrap;<br>user-select: all; |
