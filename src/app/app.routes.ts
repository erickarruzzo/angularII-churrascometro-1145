import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CriacaoChurrascoComponent } from './pages/criacao-churrasco/criacao-churrasco.component';
import { ListaChurrascoComponent } from './pages/lista-churrasco/lista-churrasco.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetalheChurrascoComponent } from './pages/detalhe-churrasco/detalhe-churrasco.component';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { BadRequestComponent } from './pages/bad-request/bad-request.component';

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
        component: CriacaoProdutoComponent,
        title: 'Churrascometro - Criação de Produto',
      },
      {
        path: ':id',
        component: CriacaoProdutoComponent,
        title: 'Churrascometro - Edição de Produto',
      },
    ],
  },
  {
    path: 'produtos/:id',
    component: CriacaoProdutoComponent,
    title: 'Churrascometro - Edição de Produto',
  },
  { path: 'bad-request', component: BadRequestComponent },
  { path: '**', component: NotFoundComponent },
];
