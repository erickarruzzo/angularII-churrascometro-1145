import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrecoFormularioComponent } from '../../shared/components/preco-formulario/preco-formulario.component';
import { RouterLink } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoginService } from '../../shared/services/login.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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

  usuario = this.storageService.usuario;
  constructor(public loginService: LoginService, public storageService: StorageService) {
    effect(() => {
      if (this.usuario()) {
        this.welcomeMessage = `Bem-vindo ao Churrascômetro ${this.usuario()}!`;
      } else {
        this.welcomeMessage = 'Bem-vindo ao Churrascômetro!';
      }
    })
  }
}
