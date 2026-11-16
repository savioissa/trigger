import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, computed, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Textarea para JSON com coluna de números de linha.
 * Sem quebra automática de linha, para que cada número corresponda a uma linha real do texto.
 */
@Component({
  selector: 'app-trigger-json-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trigger-json-editor.component.html',
  styleUrl: './trigger-json-editor.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TriggerJsonEditorComponent), multi: true }]
})
export class TriggerJsonEditorComponent implements ControlValueAccessor {
  @Input() inputId?: string;
  @Input() invalido = false;
  @Input() rows = 6;
  @Input() describedBy?: string;

  @ViewChild('area', { static: true }) private area!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('gutter', { static: true }) private gutter!: ElementRef<HTMLDivElement>;

  protected readonly valor = signal('');
  protected readonly desabilitado = signal(false);
  protected readonly linhas = computed(() =>
    Array.from({ length: this.valor().split('\n').length }, (_, i) => i + 1)
  );

  private onChange: (valor: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(valor: string | null): void {
    const texto = valor ?? '';
    this.valor.set(texto);
    this.area.nativeElement.value = texto;
  }

  registerOnChange(fn: (valor: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(desabilitado: boolean): void {
    this.desabilitado.set(desabilitado);
  }

  protected aoDigitar(texto: string): void {
    this.valor.set(texto);
    this.onChange(texto);
  }

  protected sincronizarRolagem(): void {
    this.gutter.nativeElement.scrollTop = this.area.nativeElement.scrollTop;
  }
}
