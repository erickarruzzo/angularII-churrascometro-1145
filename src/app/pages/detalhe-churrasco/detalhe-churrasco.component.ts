import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './detalhe-churrasco.component.html',
  styleUrl: './detalhe-churrasco.component.scss'
})
export default class DetalheChurrascoComponent implements OnInit {
  paramId?: string = '';

  constructor(public router: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.paramId = this.router.snapshot.paramMap.get('id')?.toString();
  }
}
