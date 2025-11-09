import { Routes } from '@angular/router';
import { CreditCartComponent } from './features/payments/cc-payment/cc-payment';
import { UserList } from './features/users/user-list/user-list';

export const routes: Routes = [
    // { path: '', component: App, title: 'Página Inicial' },

    // Rota para a página "Payments"
    { path: 'users', component: UserList, title: 'Users' },

    // Rota para a página "Payments"
    { path: 'payments', component: CreditCartComponent, title: 'Payments' },

    // Redirecionamento (exemplo: se alguém digitar 'home', redireciona para a raiz)
    // { path: 'home', redirectTo: '', pathMatch: 'full' },
];
