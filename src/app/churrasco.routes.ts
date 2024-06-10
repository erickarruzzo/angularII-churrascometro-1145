import { Routes } from '@angular/router';
import { canDeactivateGuard } from './shared/guards/can-deactivate.guard';

export const ChurrascoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/lista-churrasco/lista-churrasco.component'),
    title: 'Churrascometro - Lista de churrasco',
  },
  {
    path: 'novo',
    loadComponent: () => import('./pages/criacao-churrasco/criacao-churrasco.component'),
    title: 'Churrascometro - Novo churrasco'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/detalhe-churrasco/detalhe-churrasco.component'),
    title: 'Churrascometro - Detalhe de Churrasco',
    canDeactivate: [canDeactivateGuard],
    // canMatch: [canMatchGuard],
    // canActivate: [canActivateGuard, canActivate2Guard],
  },
];
