import { Component } from '@angular/core';
import { ProdutoFormularioComponent } from '../../shared/components/produto-formulario/produto-formulario.component';

@Component({
  selector: 'app-criacao-produto',
  standalone: true,
  imports: [ProdutoFormularioComponent],
  templateUrl: './criacao-produto.component.html',
  styleUrl: './criacao-produto.component.scss',
})
export class CriacaoProdutoComponent {
}
