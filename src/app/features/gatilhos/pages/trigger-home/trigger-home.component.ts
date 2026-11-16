import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Home do gatilho — PROVISÓRIA.
 * Existe só para que a navegação depois de criar um gatilho tenha destino.
 * A página ainda não foi especificada (está como pendente na especificação).
 */
@Component({
  selector: 'app-trigger-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
  template: `
    <header class="cabecalho">
      <h1 class="t-title-lg titulo">{{ 'portal.generic.label.trigger' | translate }}</h1>
    </header>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: #fff;
    }

    .cabecalho {
      display: flex;
      align-items: center;
      height: 68px;
      padding: 0 28px;
      border-bottom: 1px solid #E5E7EB;
      box-sizing: border-box;
    }

    .titulo {
      margin: 0;
      color: #1E293B;
    }
  `
})
export class TriggerHomeComponent {}
