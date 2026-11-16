import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { IDIOMA_PADRAO } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  template: `
    <router-outlet />
    <p-toast position="top-right" />
  `
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly primengConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // Textos internos do PrimeNG (calendário e listas sem resultado) vêm das tags da planilha.
    this.translate.use(IDIOMA_PADRAO).subscribe(() => this.aplicarTraducaoPrimeng());
    this.translate.onLangChange.subscribe(() => this.aplicarTraducaoPrimeng());
  }

  private aplicarTraducaoPrimeng(): void {
    const t = (tag: string): string => this.translate.instant(tag);
    const lista = (prefixo: string, quantidade: number): string[] =>
      Array.from({ length: quantidade }, (_, i) => t(`${prefixo}.${i}`));
    const semResultado = t('portal.generic.results-not-found');

    this.primengConfig.setTranslation({
      monthNames: lista('monthNames', 12),
      monthNamesShort: lista('monthNamesShort', 12),
      dayNamesMin: lista('dayNamesMin', 7),
      firstDayOfWeek: Number(t('firstDayOfWeek')),
      dateFormat: t('dateFormat'),
      emptyMessage: semResultado,
      emptyFilterMessage: semResultado
    });
  }
}
