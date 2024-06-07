import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CriacaoChurrascoComponent } from './pages/criacao-churrasco/criacao-churrasco.component';
import { ListaChurrascoComponent } from './pages/lista-churrasco/lista-churrasco.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetalheChurrascoComponent } from './pages/detalhe-churrasco/detalhe-churrasco.component';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { canActivateGuard } from './shared/guards/can-activate.guard';
import { canActivateChildGuard } from './shared/guards/can-activate-child.guard';
import { canMatchGuard } from './shared/guards/can-match.guard';
import { canDeactivateGuard } from './shared/guards/can-deactivate.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Churrascometro - Home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'churrascos',
    canActivateChild: [canActivateChildGuard],
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
        canDeactivate: [canDeactivateGuard]
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
        path: ':produto',
        component: CriacaoProdutoComponent,
        title: 'Churrascometro - Criação de Produtos',
        canMatch: [canMatchGuard],
      },
      {
        path: ':produto/:id',
        component: CriacaoProdutoComponent,
        title: 'Churrascometro - Edição de Produtos',
      },
    ],
  },
  { path: 'unauthorized', component: NotFoundComponent },
  { path: 'erro/:status', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
