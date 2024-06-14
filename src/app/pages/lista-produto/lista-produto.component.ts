import { Component } from '@angular/core';
import { ListaComponent } from '../../shared/components/lista/lista.component';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [ListaComponent],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss'
})
export default class ListaProdutoComponent {

}
