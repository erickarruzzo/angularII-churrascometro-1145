import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss'
})
export class ListaProdutoComponent implements OnInit {

  getCarnes = this.servico.getCarnes;

  constructor(public router: Router, private servico: ChurrascometroService) {}

  ngOnInit(): void {
    this.servico.httpGetCarnes().subscribe();
  }

  navegarParaEdicao(id: string) {
    this.router.navigate(['/produtos/carnes/', id]);
  }
}
