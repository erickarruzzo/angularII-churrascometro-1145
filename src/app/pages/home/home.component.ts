import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrecoFormularioComponent } from '../../shared/components/preco-formulario/preco-formulario.component';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, PrecoFormularioComponent, RouterLink, MatButtonToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  usuario = this.storageService.user.asReadonly();
  welcomeMessage = `Bem-vindo ao Churrascômetro!`;

  // #scrollService = inject(ScrollService);

  constructor(public storageService: StorageService) {
    effect(() => {
      if (this.usuario()) {
        this.welcomeMessage = `Bem-vindo ao Churrascômetro ${ this.storageService.user() }!`;
      } else {
        this.welcomeMessage = `Bem-vindo ao Churrascômetro!`;
      }
    })
   }
}
