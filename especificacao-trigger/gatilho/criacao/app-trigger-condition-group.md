# app-trigger-condition-group

### Aplicação
Bloco de condições de um tipo de combinação. A página usa dois: "Todas as condições devem
ser atendidas" (todas precisam ser verdadeiras) e "Qualquer condição deve ser atendida"
(basta uma ser verdadeira). Cada bloco lista as condições, uma por linha, com Categoria,
Operador e Valor, e permite adicionar e remover linhas. A linha de condição faz parte deste
componente.

### Componentização
| Componente      | Tipo    | Onde é usado                                                      |
| --------------- | ------- | ----------------------------------------------------------------- |
| `p-dropdown`    | Externo | Categoria, Operador, Valor do tipo Lista e Valor sem categoria    |
| `p-inputNumber` | Externo | Valor do tipo Número                                              |
| `p-calendar`    | Externo | Valor do tipo Data                                                |
| `pInputText`    | Externo | Valor do tipo Texto                                               |
| `p-button`      | Externo | Botões "Remover condição" e "Adicionar condição"                  |

### Elementos

#### Título do bloco
- **Tag:** recebido de `app-trigger-form`: `portal.generic.label.all-conditions-satisfied`
  no bloco "Todas" e `portal.generic.label.any-condition-satisfied` no bloco "Qualquer"
- **CSS:** `.grupo__titulo`; h3; nomeia o bloco para leitores de tela.

#### Lista de condições
- **CSS:** `.grupo__lista`; 12px entre as linhas.
- **Regras:** uma linha por condição, na ordem em que foram adicionadas; sem limite de
  quantidade; sem nenhuma linha, a lista não aparece.

#### Rótulo "Categoria"
- **Tag:** `portal.generic.label.category`
- **CSS:** `form-overline` (globais); associado ao campo Categoria da linha.

#### Campo Categoria
- **Tag:** `portal.createso.placeholder.find-category` (placeholder)
- **Componente:** `p-dropdown`, com grupos
- **CSS:** `campo` e `campo-painel` (globais)
- **Comportamento:** ao abrir, lista as categorias agrupadas: o nome do grupo aparece como
  cabeçalho não selecionável, em maiúsculas, e as categorias do grupo logo abaixo. Ao
  escolher uma categoria, o campo mostra "Grupo > Categoria" (ex.: "Ordem de serviço >
  Status"); o Operador é habilitado e, se ainda estiver vazio, recebe "Igual a"; o Valor é
  limpo e habilitado (ou desabilitado, se o operador não usar valor). Ao trocar de
  categoria, o operador escolhido é mantido.
- **Regras:** hoje há um único grupo, "Ordem de serviço", com uma única categoria,
  "Status". Uma linha sem categoria é ignorada: não bloqueia o botão "Criar" e não é salva.
  Depois de escolhida, a categoria não pode voltar a ficar vazia.
- **Origem do dado:** `--`

#### Rótulo "Operador"
- **Tag:** `iclass.generic.label.select-operator`
- **CSS:** `form-overline` (globais); associado ao campo Operador da linha.

#### Campo Operador
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`
- **CSS:** `campo` e `campo-painel` (globais); a lista mostra até 480px de altura, o
  suficiente para as 12 opções sem rolagem.
- **Comportamento:** ao escolher um operador que não usa valor, o Valor é limpo e
  desabilitado; ao escolher um operador que usa valor, o Valor é habilitado e mantém o
  valor que já estava escolhido.
- **Regras:** desabilitado enquanto a linha não tem categoria. Com categoria, é
  obrigatório; sem operador, exibe `portal.generic.label.required-field` (`form-error`,
  globais) e borda vermelha (`campo--invalido`, globais) depois que o usuário sai do campo.
  As opções são as mesmas para qualquer categoria, nesta ordem:

  | Opção             | Tag                                            | Usa valor |
  | ----------------- | ---------------------------------------------- | --------- |
  | Igual a           | `portal.generic.label.equal`                   | sim       |
  | Diferente         | `portal.generic.label.operator-different`      | sim       |
  | Maior que         | `portal.generic.label.greater-than`            | sim       |
  | Menor que         | `portal.generic.label.less-than`               | sim       |
  | Alterado          | `portal.generic.label.operator-changed`        | não       |
  | Não alterado      | `portal.generic.label.operator-not-changed`    | não       |
  | Alterado para     | `portal.generic.label.operator-changed-to`     | sim       |
  | Não alterado para | `portal.generic.label.operator-not-changed-to` | sim       |
  | Alterado de       | `portal.generic.label.operator-changed-from`   | sim       |
  | Não alterado de   | `portal.generic.label.operator-not-changed-from` | sim     |
  | Presente          | `portal.generic.label.operator-present`        | não       |
  | Ausente           | `portal.generic.label.operator-absent`         | não       |

#### Rótulo "Valor"
- **Tag:** `portal.generic.label.value`
- **CSS:** `form-overline` (globais); associado ao campo Valor da linha.

#### Campo Valor
- **Tag:** placeholder conforme o caso (ver Regras)
- **Componente:** depende do tipo da categoria: `p-dropdown` (Lista), `p-inputNumber`
  (Número), `p-calendar` (Data) ou `pInputText` (Texto); sem categoria, `p-dropdown`
  desabilitado.
- **CSS:** `campo` e `campo-painel` (globais) no tipo Lista; `campo-host` no componente e
  `campo` no campo de digitação (globais) nos tipos Número e Data; `campo` (globais) no
  tipo Texto.
- **Comportamento:**
  - **Lista:** ao abrir, mostra os valores da categoria (até 480px de altura, com rolagem
    além disso); ao escolher, o campo mostra o valor.
  - **Número:** aceita número decimal com até 2 casas decimais, no formato de número do
    idioma do usuário.
  - **Data:** abre um calendário pelo ícone de calendário dentro do campo e aceita a data
    digitada no formato de data do idioma do usuário. No calendário, o nome do mês usa
    `monthNames.0` a `monthNames.11`, a escolha do mês usa `monthNamesShort.0` a
    `monthNamesShort.11`, as iniciais dos dias da semana usam `dayNamesMin.0` a
    `dayNamesMin.6` e a semana começa no dia indicado por `firstDayOfWeek`.
  - **Texto:** aceita texto livre; espaços nas pontas não são salvos.
- **Regras:**
  - Sem categoria: desabilitado, com o placeholder
    `portal.generic.placeholder.select-category-first`.
  - Com operador que não usa valor (Alterado, Não alterado, Presente, Ausente): vazio,
    desabilitado, com o placeholder `portal.generic.placeholder.value-not-applicable`; a
    condição é salva sem valor.
  - Nos demais casos: habilitado e obrigatório (no tipo Texto, só espaços não vale), com o
    placeholder do tipo: Lista `portal.generic.placeholder.select-value`, Número
    `portal.generic.placeholder.number-value` e Texto `portal.generic.placeholder.type-value`;
    o tipo Data fica sem placeholder.
  - Sem valor, exibe `portal.generic.label.required-field` (`form-error`, globais) e borda
    vermelha (`campo--invalido`, globais) depois que o usuário sai do campo.
  - Desabilitado, tem fundo `#F3F4F6` e texto `#9CA3AF`.
  - Hoje só a categoria "Status" existe e é do tipo Lista, com os valores Aberta, Agendada,
    Atendimento, Aprovação, Fila técnico, Deslocamento, Despachada, Vinculada credenciada,
    Em análise, Concluída, Encerrada, Paralisada, Pré-aberta e Suporte, nessa ordem.
- **Origem do dado:** `--`

#### Botão "Remover condição"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--danger btn--text p-button-icon-only` (globais); `p-button-icon-only` é aplicada pelo PrimeNG em botão só com ícone.
- **Comportamento:** ao clicar, remove a linha imediatamente, sem confirmação.

#### Botão "Adicionar condição"
- **Tag:** `portal.generic.label.add-condition`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--dashed` (globais)
- **Comportamento:** ao clicar, adiciona uma linha vazia ao fim do bloco, com Operador e
  Valor desabilitados.

### Layout
O bloco é uma coluna, com 12px entre os itens:

1. **Título do bloco (topo).**
2. **Lista de condições:** cada linha tem duas colunas (`item-linha`, globais):
   1. **Esquerda (ocupa o espaço restante):** card (`item-card`, globais) com Categoria,
      Operador e Valor lado a lado, em três colunas na proporção 1,2 : 1 : 1, com 14px
      entre elas; cada coluna é um `form-field` (globais): rótulo em cima, campo e mensagem de erro embaixo.
   2. **Direita (32px):** botão "Remover condição", centralizado na altura do card.
3. **Botão "Adicionar condição" (embaixo, alinhado à esquerda).**

### Estados
| Estado                   | Quando                                               | O que deve ser exibido                                                                           |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Sem condições            | O bloco não tem nenhuma linha                        | Só o título e o botão "Adicionar condição"                                                      |
| Linha sem categoria      | Linha recém-adicionada                               | Categoria com placeholder; Operador e Valor desabilitados, com seus placeholders                 |
| Linha com categoria      | Categoria escolhida e operador que usa valor         | Operador preenchido; Valor habilitado no controle do tipo da categoria                           |
| Operador sem valor       | Operador Alterado, Não alterado, Presente ou Ausente | Valor vazio e desabilitado, com `portal.generic.placeholder.value-not-applicable`                |
| Campo obrigatório vazio  | Operador ou Valor habilitado e vazio, depois que o usuário saiu do campo | Borda vermelha no campo e `portal.generic.label.required-field` abaixo dele |

### Comportamentos
- **Dado** uma linha com categoria, operador e valor escolhidos, **quando** o usuário troca
  a categoria, **então** o operador é mantido e o valor é limpo, no controle do tipo da nova
  categoria.

### CSS
| Classe        | Definição |
| ------------- | --------- |
| :host         | display: block; |
| .grupo        | display: flex;<br>flex-direction: column;<br>gap: 12px; |
| .grupo__titulo | margin: 0;<br>font: 500 14px/21px var(--font-family-text);<br>color: #1F2937; |
| .grupo__lista | display: flex;<br>flex-direction: column;<br>gap: 12px; |
| .condicao     | display: grid;<br>grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);<br>align-items: start;<br>gap: 14px; |
