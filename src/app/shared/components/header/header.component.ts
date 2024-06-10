import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    RouterLink, 
    FormsModule,
    MatInputModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user!: string;
  pass!: string;
  constructor(
    public loginService: LoginService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login() {
    this.loginService.login(this.user, this.pass).subscribe({
      next: (res) => {
        this.storageService.setToken(res.token);
        this.storageService.setUser(res.user);
        this.storageService.setPerfil(res.perfil);
      }
    })
  }

  logout() {
    if (!this.loginService.isLoggedIn()) return;
    this.loginService.logout().subscribe({
      next: () => {
        this.storageService.doLogoff();
        this.router.navigate(['/home']);
      }
    })
  }
}
