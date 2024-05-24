import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './detalhe-churrasco.component.html',
  styleUrl: './detalhe-churrasco.component.scss'
})
export class DetalheChurrascoComponent //implements OnInit
{
  idStr?: string = '';
  @Input() set id(code: string) {
    console.log('ID', code);
    this.idStr = code;
  }

  // constructor(private router: ActivatedRoute) {}
  
  // ngOnInit(): void {
  //   console.log('ID', this.router.snapshot.params['id']);
  //   console.log('ID', this.router.snapshot.paramMap.get('id'));
  // }

}
