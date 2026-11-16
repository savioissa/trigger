import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'gatilhos/novo' },
  {
    path: 'gatilhos/novo',
    loadComponent: () =>
      import('./features/gatilhos/pages/trigger-form/trigger-form.component').then(m => m.TriggerFormComponent)
  },
  {
    // Provisória: a home do gatilho ainda não foi especificada.
    path: 'gatilhos/:id',
    loadComponent: () =>
      import('./features/gatilhos/pages/trigger-home/trigger-home.component').then(m => m.TriggerHomeComponent)
  },
  { path: '**', redirectTo: 'gatilhos/novo' }
];
