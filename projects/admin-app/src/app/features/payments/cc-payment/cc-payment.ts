import { Component, computed, inject, signal } from '@angular/core';
import { 
  ReactiveFormsModule, 
  NonNullableFormBuilder, 
  Validators 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cc-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  templateUrl: './cc-payment.html',
  styleUrl: './cc-payment.scss'
})
export class CreditCartComponent {
  private fb = inject(NonNullableFormBuilder);

  // --- Estado do Formulário (Reativo) ---
  paymentForm = this.fb.group({
    cardNumber: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{16}$') 
    ]],
    cardHolder: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    expMonth: ['', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])$') // MM
    ]],
    // CORREÇÃO 1: Validação para 2 dígitos (24-99)
    expYear: ['', [
      Validators.required,
      Validators.pattern('^(2[4-9]|[3-9][0-9])$') // AA (a partir de 24)
    ]],
    cvv: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{3,4}$') 
    ]],
  });

  // --- Estado da UI (Signals) ---
  isFlipped = signal(false);
  focusState = signal<string | null>(null);

  // --- Bridge: Conecta o Formulário Reativo aos Signals ---
  cardNumber = toSignal(this.paymentForm.controls.cardNumber.valueChanges, { initialValue: '' });
  cardHolder = toSignal(this.paymentForm.controls.cardHolder.valueChanges, { initialValue: '' });
  expMonth = toSignal(this.paymentForm.controls.expMonth.valueChanges, { initialValue: '' });
  expYear = toSignal(this.paymentForm.controls.expYear.valueChanges, { initialValue: '' });
  cvv = toSignal(this.paymentForm.controls.cvv.valueChanges, { initialValue: '' });

  // --- Signals Computados (Derivados) para a Exibição no Cartão ---
  
  cardNumberDisplay = computed(() => {
    const num = this.cardNumber().padEnd(16, '#');
    return [
      num.slice(0, 4),
      num.slice(4, 8),
      num.slice(8, 12),
      num.slice(12, 16)
    ].join(' ');
  });
  
  cardHolderDisplay = computed(() => this.cardHolder().toUpperCase());
  expMonthDisplay = computed(() => this.expMonth());
  // CORREÇÃO 1: Agora o 'expYear' já tem 2 dígitos, não precisa do slice
  expYearDisplay = computed(() => this.expYear()); 
  cvvDisplay = computed(() => '*'.repeat(this.cvv().length)); 

  cardBrandLogo = computed(() => {
    const brand = this.detectCardBrand(this.cardNumber());
    switch (brand) {
      case 'visa':
        return 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg';
      case 'mastercard':
        return 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg';
      default:
        return '';
        // return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjY2NjIj48L3JlY3Q+PHRleHQgeD0iMzIiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiP0xPR088L3RleHQ+PC9zdmc+';
    }
  });

  // --- Lógica de Eventos ---
  
  onFieldFocus(field: string) {
    this.focusState.set(field);
    this.isFlipped.set(field === 'cvv');
  }
  
  onFieldBlur() {
    this.focusState.set(null);
    this.isFlipped.set(false);
  }
  
  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Formulário Enviado!', this.paymentForm.getRawValue());
      alert('Pagamento enviado! (Verifique o console)');
    } else {
      console.error('Formulário inválido');
      this.paymentForm.markAllAsTouched();
    }
  }

  // --- Funções Utilitárias ---
  
  private detectCardBrand(cardNumber: string): string {
    if (cardNumber.startsWith('4')) {
      return 'visa';
    }
    if (cardNumber.startsWith('51') || cardNumber.startsWith('52') || cardNumber.startsWith('53') || cardNumber.startsWith('54') || cardNumber.startsWith('55')) {
      return 'mastercard';
    }
    return 'default';
  }
}