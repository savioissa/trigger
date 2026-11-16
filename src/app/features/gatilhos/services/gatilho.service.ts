import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

import { Gatilho, GrupoCategoria, GrupoPlaceholder, Webhook } from '../models/gatilho.model';
import { CATEGORIAS_MOCK, PLACEHOLDERS_MOCK, WEBHOOKS_MOCK } from './gatilho.mock';

/**
 * Acesso aos dados de gatilhos.
 * Hoje responde com dados mock e uma latência simulada; para integrar com a API,
 * troque cada `of(...)` por uma chamada `HttpClient` mantendo as mesmas assinaturas.
 */
@Injectable({ providedIn: 'root' })
export class GatilhoService {
  private readonly latenciaMs = 300;
  private readonly gatilhos: Gatilho[] = [];

  listarCategorias(): Observable<GrupoCategoria[]> {
    return of(CATEGORIAS_MOCK).pipe(delay(this.latenciaMs));
  }

  listarWebhooks(): Observable<Webhook[]> {
    return of(WEBHOOKS_MOCK).pipe(delay(this.latenciaMs));
  }

  listarPlaceholders(): Observable<GrupoPlaceholder[]> {
    return of(PLACEHOLDERS_MOCK).pipe(delay(this.latenciaMs));
  }

  criar(gatilho: Gatilho): Observable<Gatilho> {
    const criado: Gatilho = { ...gatilho, id: crypto.randomUUID() };
    return of(criado).pipe(
      delay(600),
      tap(() => this.gatilhos.push(criado))
    );
  }
}
