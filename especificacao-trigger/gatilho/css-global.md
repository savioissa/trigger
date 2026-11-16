# CSS global — Gatilho

## Tokens de texto

```css
:root {
  --font-family-text: 'Geist', system-ui, sans-serif;

  --title-lg: 600 24px/32px var(--font-family-text);
  --title-sm: 600 16px/24px var(--font-family-text);

  --secondary-lg: 400 14px/21px var(--font-family-text);
  --secondary-md: 400 13px/20px var(--font-family-text);
  --secondary-sm: 400 11px/16px var(--font-family-text);

  --label-field: 500 13px/20px var(--font-family-text);
  --label-overline: 500 11px/16px var(--font-family-text);

  --letter-spacing-overline: .03em;
}
```

## Títulos

```css
.t-title-lg { font: var(--title-lg); letter-spacing: -.015em; }
.t-title-sm { font: var(--title-sm); letter-spacing: -.005em; }
```

## Botões

```css
.p-button.p-button-icon-only { width: auto; aspect-ratio: 1 / 1; padding: 0; justify-content: center; }
.p-button.p-button-icon-only { gap: 0; }
.p-button:disabled { opacity: .5; }

.p-button.btn--md { height: 32px; padding: 0 16px; font-size: 16px; gap: 6px; font-weight: 500; }
.p-button.btn--md .p-button-icon { font-size: 16px; }
.p-button.btn--md .p-button-label { font-weight: 500; }
.p-button.btn--md { box-sizing: border-box; line-height: 1; }

.p-button.btn--primary { background: #3b82f6; color: #ffffff; border-color: transparent; border-radius: 4px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--primary:not(:disabled):hover { background: #1d4ed8; color: #ffffff; border-color: transparent; }

.p-button.btn--neutral { background: #ffffff; color: #1f2937; border-color: #d9dce1; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--neutral:not(:disabled):hover { background: #f1f2f4; color: #111827; border-color: #d9dce1; }
.p-button.btn--neutral:not(:disabled):active { background: #e2e4e8; color: #111827; border-color: #d9dce1; }

.p-button.btn--danger { background: #dc2626; color: #ffffff; border-color: transparent; border-radius: 4px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--danger:not(:disabled):hover { background: #b91c1c; color: #ffffff; border-color: transparent; }
.p-button.btn--danger.btn--text { color: #dc2626; justify-content: center; background: transparent; box-shadow: none; border: none; }
.p-button.btn--danger.btn--text:not(:disabled):hover { background: #fef2f2; color: #dc2626; border-color: transparent; }

/* botão de texto com a cor dos ícones do botão neutro */
.p-button.btn--text.icon-neutral { color: #1f2937; }
.p-button.btn--text.icon-neutral:not(:disabled):hover { background: #f1f2f4; color: #111827; }

/* botão tracejado de "Adicionar ..." */
.p-button.btn--dashed { height: 38px; padding: 0 16px; gap: 8px; background: transparent; color: #1d4ed8; border: 1px dashed #9CA3AF; border-radius: 4px; box-shadow: none; font-size: 14px; font-weight: 500; box-sizing: border-box; }
.p-button.btn--dashed .p-button-icon { font-size: 14px; }
.p-button.btn--dashed .p-button-label { font-weight: 500; }
.p-button.btn--dashed:not(:disabled):hover { background: #F1F6FF; color: #1e40af; border-color: #60A5FA; }

/* botão com aparência de link */
.link-btn { padding: 0; border: 0; background: none; color: #2563EB; font: var(--secondary-md); cursor: pointer; text-align: left; }
.link-btn:hover { color: #1d4ed8; text-decoration: underline; }
.link-btn:focus-visible { outline: 2px solid #3B82F655; outline-offset: 2px; border-radius: 2px; }
```

## Campos de formulário

```css
.form-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.form-field > p-dropdown,
.form-field > p-calendar,
.form-field > p-inputnumber { display: block; width: 100%; min-width: 0; }

.form-label { font: var(--label-field); color: #1F2937; }
.form-label__required { color: #DC2626; margin-left: 2px; }
.form-overline { font: var(--label-overline); letter-spacing: var(--letter-spacing-overline); text-transform: uppercase; color: #6B7280; }
.form-error { margin: 0; font: var(--secondary-sm); color: #DC2626; }

.p-inputtext.campo { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #CBD5E1; border-radius: 6px; background: #fff; color: #1E293B; font: var(--secondary-lg); box-sizing: border-box; }
.p-inputtext.campo-textarea { width: 100%; min-height: 80px; padding: 10px 12px; border: 1px solid #CBD5E1; border-radius: 6px; background: #fff; color: #1E293B; font: var(--secondary-lg); box-sizing: border-box; resize: vertical; display: block; }
.p-inputtext.campo::placeholder, .p-inputtext.campo-textarea::placeholder { color: #6B7280; }
.p-inputtext.campo:enabled:hover, .p-inputtext.campo-textarea:enabled:hover { border-color: #3B82F6; }
.p-inputtext.campo:enabled:focus, .p-inputtext.campo-textarea:enabled:focus { border-color: #3B82F6; box-shadow: 0 0 0 2px #3B82F655; outline: none; }

.p-dropdown.campo { display: flex; width: 100%; height: 40px; align-items: center; border: 1px solid #CBD5E1; border-radius: 6px; background: #fff; }
.p-dropdown.campo .p-dropdown-label { padding: 0 12px; font: var(--secondary-lg); color: #1E293B; }
.p-dropdown.campo .p-dropdown-label.p-placeholder { color: #6B7280; }
.p-dropdown.campo .p-dropdown-trigger { width: 40px; color: #4B5563; }
.p-dropdown.campo .p-dropdown-trigger .p-icon { width: 14px; height: 14px; }
.p-dropdown.campo:not(.p-disabled):hover { border-color: #3B82F6; }
.p-dropdown.campo:not(.p-disabled).p-focus { border-color: #3B82F6; box-shadow: 0 0 0 2px #3B82F655; }
.p-dropdown.campo.p-disabled { opacity: 1; background: #F3F4F6; border-color: #E5E7EB; }
.p-dropdown.campo.p-disabled .p-dropdown-label,
.p-dropdown.campo.p-disabled .p-dropdown-label.p-placeholder,
.p-dropdown.campo.p-disabled .p-dropdown-trigger { color: #9CA3AF; }

.campo-painel.p-dropdown-panel .p-dropdown-items { padding: 4px; }
.campo-painel.p-dropdown-panel .p-dropdown-item { padding: 8px 12px; border-radius: 4px; font: var(--secondary-lg); color: #1E293B; }
.campo-painel.p-dropdown-panel .p-dropdown-item.p-highlight { background: #E9F2FF; color: #1d4ed8; }
.campo-painel.p-dropdown-panel .p-dropdown-header { padding: 8px; }
.campo-painel.p-dropdown-panel .p-dropdown-filter { height: 32px; font: var(--secondary-md); }
/* cabeçalho de grupo (dropdown com grupos) */
.campo-painel.p-dropdown-panel .p-dropdown-item-group { padding: 8px 12px 4px; background: transparent; font: var(--label-overline); letter-spacing: var(--letter-spacing-overline); text-transform: uppercase; color: #6B7280; }

.p-inputnumber.campo-host, .p-calendar.campo-host { display: flex; width: 100%; }
.p-calendar.campo-host .p-datepicker-trigger-icon { color: #4B5563; }

/* estado inválido */
.campo--invalido .p-inputtext,
.campo--invalido.p-inputtext,
.campo--invalido .p-dropdown,
.campo--invalido.p-dropdown { border-color: #DC2626 !important; }
```

## Cards de item (condição e ação)

```css
.item-linha { display: grid; grid-template-columns: minmax(0, 1fr) 32px; align-items: center; gap: 16px; }
.item-card { padding: 16px; background: #F8F9FB; border: 1px solid #D9DCE1; border-radius: 8px; min-width: 0; }
```

## Abas do painel de placeholders

```css
.placeholders-tabs .p-tabview-nav-content { border-bottom: 1px solid #E5E7EB; padding: 0 8px; }
.placeholders-tabs .p-tabview-nav { background: transparent; border: 0; }
.placeholders-tabs .p-tabview-nav li .p-tabview-nav-link { background: transparent; padding: 8px 12px; margin-bottom: -1px; border-width: 0 0 2px; font: 500 13px/20px var(--font-family-text); color: #4B5563; }
.placeholders-tabs .p-tabview-nav li.p-highlight .p-tabview-nav-link { color: #2563EB; border-color: #3B82F6; }
.placeholders-tabs .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link { background: transparent; color: #1F2937; border-color: #D1D5DB; }
.placeholders-tabs .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus-visible { box-shadow: inset 0 0 0 2px #3B82F655; }
.placeholders-tabs .p-tabview-panels { background: transparent; padding: 8px 0; }
```

## Tooltip

```css
.p-tooltip.tooltip--largo { max-width: 320px; }
.p-tooltip.tooltip--largo .p-tooltip-text { font: var(--secondary-md); }
```

## Toast

```css
/* abaixo do cabeçalho fixo (68px), para não cobrir os botões Cancelar e Criar */
.p-toast.p-toast-top-right { top: 80px; }
```

## Skeleton

```css
@keyframes ui-skeleton { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }

.skeleton { height: 18px; border-radius: 4px; background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 37%, #F1F5F9 63%); background-size: 400% 100%; animation: ui-skeleton 1.4s ease infinite; }
```
