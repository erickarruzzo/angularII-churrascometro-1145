import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  welcomeMessage: string = 'Bem-vindo ao Churrascômetro!'

  $router = inject(Router);
  
  irParaCriacaoChurrasco() {
    this.$router.navigate(['/churrascos/novo']);
  }
}
