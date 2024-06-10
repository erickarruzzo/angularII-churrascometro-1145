import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export default class ErrorComponent implements OnInit {
  code!: string;
  message!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code'];
    this.message = this.activatedRoute.snapshot.queryParams['message'];
  }

}
