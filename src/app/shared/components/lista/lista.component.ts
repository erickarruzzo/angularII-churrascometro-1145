import { Component, Input, OnInit, effect } from '@angular/core';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent implements OnInit {
  @Input() produto!: string;

  getCarnes = this.service.getCarnes;
  getBebidas = this.service.getBebidas;

  items: any[] = [];

  constructor(private service: ChurrascometroService, private router: Router) {}

  ngOnInit(): void {
    switch (this.produto) {
      case 'carnes':
        this.service.httpGetCarnes().subscribe({
          next: (carnes) => {
            this.items = carnes;
          },
        });
        break;
      case 'bebidas':
        this.service.httpGetBebidas().subscribe({
          next: (bebidas) => {
            this.items = bebidas;
          },
        });
    }
  }

  navegarParaEdicao(id: any) {
    this.router.navigate([`produtos/${this.produto}`, id]);
  }

  navegarParaCriacao() {
    this.router.navigate([`produtos/${this.produto}`]);
  }
}
