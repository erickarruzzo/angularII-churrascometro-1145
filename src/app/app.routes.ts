import { Routes } from '@angular/router';
import { canActivateChildGuard } from './shared/guards/can-activate-child.guard';
import { canMatchGuard } from './shared/guards/can-match.guard';

export const routes: Routes = [
  { 
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    title: 'Churrascometro - Home' 
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  {
    path: 'churrascos',
    canActivateChild: [canActivateChildGuard],
    loadChildren: () => import('./churrasco.routes').then(r => r.ChurrascoRoutes)
  },
  {
    path: 'produtos',
    canMatch: [canMatchGuard],
    loadChildren: () => import('./produto.routes').then(r => r.ProdutoRoutes)
  },
  { 
    path: 'error/:code',
    loadComponent: () => import('./pages/error/error.component') 
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component') 
  },
];
