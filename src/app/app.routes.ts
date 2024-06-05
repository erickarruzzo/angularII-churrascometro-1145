import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CriacaoChurrascoComponent } from './pages/criacao-churrasco/criacao-churrasco.component';
import { ListaChurrascoComponent } from './pages/lista-churrasco/lista-churrasco.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetalheChurrascoComponent } from './pages/detalhe-churrasco/detalhe-churrasco.component';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { ListaProdutoComponent } from './pages/lista-produto/lista-produto.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Churrascometro - Home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'churrascos',
    children: [
      {
        path: '',
        component: ListaChurrascoComponent,
        title: 'Churrascometro - Lista de churrasco',
      },
      {
        path: 'novo',
        component: CriacaoChurrascoComponent,
        title: 'Churrascometro - Novo churrasco',
      },
      {
        path: ':id',
        component: DetalheChurrascoComponent,
        title: 'Churrascometro - Detalhe de Churrasco',
      },
    ],
  },
  {
    path: 'produtos',
    children: [
      {
        path: '',
        component: ListaProdutoComponent,
        title: 'Churrascometro - Lista de Produtos',
      },
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
    ],
  },
  { path: '**', component: NotFoundComponent },
];
