import { Routes } from '@angular/router';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';

export const ProdutoRoutes: Routes = [
  {
    path: ':produto',
    component: CriacaoProdutoComponent,
    title: 'Churrascometro - Criação de Produtos',
  },
  {
    path: ':produto/:id',
    component: CriacaoProdutoComponent,
    title: 'Churrascometro - Edição de Produtos',
  },
];
