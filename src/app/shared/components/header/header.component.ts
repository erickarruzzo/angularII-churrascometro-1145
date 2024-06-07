import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: string = 'letscode';
  pass: string = 'lets@123';

  constructor(public auth: LoginService, private storage: StorageService, private router: Router) { }
  
  login() {
    this.auth.login(this.user, this.pass).subscribe({
      next: (res) => {
        this.storage.setToken(res);
      },
      error: (err) => {
        console.log(err);
        this.storage.removeToken();
      }
    })
  }
  
  logout() {
    this.auth.logout().subscribe({
      next: () => { 
        this.storage.removeToken();
        this.router.navigate(['/home']);
      }, error: (error) => console.error(error)
    });
  }
}
