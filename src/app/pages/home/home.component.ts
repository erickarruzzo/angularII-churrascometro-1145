import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrecoFormularioComponent } from '../../shared/components/preco-formulario/preco-formulario.component';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    PrecoFormularioComponent,
    RouterLink,
    MatButtonToggleModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  welcomeMessage: string = 'Bem-vindo ao Churrascômetro!';

  constructor() {}
}
