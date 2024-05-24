import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrecoFormularioComponent } from '../../shared/components/preco-formulario/preco-formulario.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, PrecoFormularioComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  welcomeMessage: string = 'Bem-vindo ao Churrascômetro!'

  // #scrollService = inject(ScrollService);

  constructor() { }
}
