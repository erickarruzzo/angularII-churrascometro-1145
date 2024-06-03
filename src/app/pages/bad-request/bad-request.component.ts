import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bad-request',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './bad-request.component.html',
  styleUrl: './bad-request.component.scss'
})
export class BadRequestComponent {

}
