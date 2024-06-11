import { Routes } from '@angular/router';

export const produtosRoutes: Routes = [
  {
    path: ':produto',
    loadComponent: () => import('./pages/criacao-produto/criacao-produto.component'),
    title: 'Churrascometro - Criação de Produtos',
  },
  {
    path: ':produto/:id',
    loadComponent: () => import('./pages/criacao-produto/criacao-produto.component'),
    title: 'Churrascometro - Edição de Produtos',
  },
];
