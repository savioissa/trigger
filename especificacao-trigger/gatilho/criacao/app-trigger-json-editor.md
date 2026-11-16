# app-trigger-json-editor

### Aplicação
Campo de edição de texto JSON com uma coluna de números de linha à esquerda. Na página de
criação, é o campo "Corpo da requisição (JSON)" de cada ação (ver
`app-trigger-action.md` › Corpo da requisição). Ele funciona como um campo de formulário
comum: recebe o texto, devolve o texto editado e informa quando o usuário sai do campo. Não
tem nenhuma regra própria de gatilho.

### Componentização
— (não se aplica)

### Elementos

#### Coluna de números de linha
- **CSS:** `.json-editor__gutter`; alinhada à direita, sem seleção de texto.
- **Regras:** exibe um número por linha do texto, de 1 até a última linha, inclusive quando
  o texto está vazio (mostra "1"); acompanha a rolagem vertical da área de texto; é
  decorativa e fica oculta para leitores de tela.

#### Área de texto
- **CSS:** `.json-editor__area`; fonte monoespaçada, sem quebra automática de linha.
- **Comportamento:** ao digitar, o texto é devolvido ao formulário da ação a cada tecla; ao
  sair do campo, o campo passa a ser considerado tocado, o que libera a exibição de erro em
  `app-trigger-action`; ao rolar, a coluna de números rola junto; o usuário pode aumentar a
  altura arrastando o canto inferior direito (só na vertical); a tecla Tab move o foco
  (não insere indentação).
- **Regras:** altura inicial de 6 linhas, com mínimo de 150px; linhas longas geram rolagem horizontal em vez de
  quebrar; correção ortográfica, preenchimento automático e capitalização automática
  desligados; recebe o identificador do rótulo do pai para ficar associada a ele; quando o
  pai indica erro, recebe `aria-invalid` e é descrita pela mensagem de erro do pai.

### Layout
Uma linha única com borda e cantos arredondados, dividida em duas colunas:

1. **Esquerda (largura do maior número, mínimo 28px):** coluna de números de linha, com
   fundo cinza-claro e linha divisória à direita.
2. **Direita (ocupa o espaço restante):** área de texto.

As duas colunas têm a mesma altura e o mesmo espaçamento vertical, para que cada número
fique alinhado à sua linha.

### Estados
| Estado       | Quando                                             | O que deve ser exibido                                                  |
| ------------ | -------------------------------------------------- | ----------------------------------------------------------------------- |
| Padrão       | Campo sem foco e sem erro                          | Borda `#CBD5E1`                                                         |
| Hover        | Cursor sobre o campo                               | Borda `#3B82F6`                                                         |
| Foco         | O usuário está editando                            | Borda `#3B82F6` e anel de foco `#3B82F655` de 2px                       |
| Inválido     | O pai indica erro (campo vazio ou JSON inválido)   | Borda `#DC2626`, inclusive no hover; `aria-invalid="true"`              |
| Desabilitado | O formulário desabilita o campo                    | Componente com opacidade 0,6; área de texto não editável                |

### Comportamentos
- **Dado** um texto com mais linhas do que cabem na altura, **quando** o usuário rola a
  área de texto, **então** a coluna de números rola na mesma medida e cada número continua
  alinhado à sua linha.

### CSS
| Classe                       | Definição |
| ---------------------------- | --------- |
| :host                        | display: block; |
| .json-editor                 | --json-font: 400 13px/22px ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace;<br>--json-padding-y: 10px;<br>display: flex;<br>overflow: hidden;<br>border: 1px solid #CBD5E1;<br>border-radius: 6px;<br>background: #fff; |
| .json-editor:hover           | border-color: #3B82F6; |
| .json-editor:focus-within    | border-color: #3B82F6;<br>box-shadow: 0 0 0 2px #3B82F655; |
| .json-editor--invalido, .json-editor--invalido:hover | border-color: #DC2626; |
| .json-editor--desabilitado   | opacity: .6; |
| .json-editor__gutter         | flex: 0 0 auto;<br>min-width: 28px;<br>padding: var(--json-padding-y) 8px var(--json-padding-y) 10px;<br>overflow: hidden;<br>background: #F8FAFC;<br>border-right: 1px solid #E5E7EB;<br>color: #94A3B8;<br>font: var(--json-font);<br>text-align: right;<br>user-select: none;<br>box-sizing: border-box; |
| .json-editor__gutter span    | display: block; |
| .json-editor__area           | flex: 1 1 auto;<br>min-width: 0;<br>min-height: 150px;<br>margin: 0;<br>padding: var(--json-padding-y) 14px;<br>border: 0;<br>outline: none;<br>resize: vertical;<br>background: transparent;<br>color: #1E293B;<br>font: var(--json-font);<br>white-space: pre;<br>tab-size: 2;<br>box-sizing: border-box; |
