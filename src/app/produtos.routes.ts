import { Routes } from '@angular/router';

export const produtosRoutes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./pages/lista-produto/lista-produto.component'),
    title: 'Churrascometro - Lista de Produtos'
  },
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
