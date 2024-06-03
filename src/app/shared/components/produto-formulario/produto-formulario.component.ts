import { Component, Input, OnInit, effect } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carnes } from '../../models/carnes.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './produto-formulario.component.html',
  styleUrl: './produto-formulario.component.scss',
})
export class ProdutoFormularioComponent implements OnInit {
  @Input() id: string | undefined;

  campos = [
    { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
    { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
    { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
    {
      nome: 'consumo_medio_adulto_g',
      tipo: 'number',
      placeholder: 'Consumo médio por adulto (g)',
    },
    {
      nome: 'consumo_medio_crianca_g',
      tipo: 'number',
      placeholder: 'Consumo médio por criança (g)',
    },
  ];

  form!: FormGroup;
  getCarne = this.servico.getProduto;
  getError = this.servico.getError;

  constructor(
    private formBuilder: FormBuilder,
    private servico: ChurrascometroService,
    private router: Router
  ) {
    effect(() => {
      if (this.getCarne()) {
        this.form.patchValue(this.getCarne());
      }

      if (this.getError()) {
        console.log('Erro', this.getError()?.status);
        switch (this.getError()?.status) {
          case 404:
            this.router.navigate(['not-found']);
            break;
          case 400:
            this.router.navigate(['bad-request']);
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required]);
    });

    if (this.id) {
      this.servico.httpGetCarne(this.id).subscribe({
        error: (error) => console.error(error),
      });
    }
  }

  private addFormControl(
    fieldName: string,
    validators: any[] = [],
    value: string = ''
  ): void {
    this.form.addControl(fieldName, this.formBuilder.control(value, validators));
  }

  submit() {
    if (this.form.valid) {
      let carne!: Carnes;

      // { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
      this.campos.forEach((campo) => {
        const value = this.getValorFormControl(campo.nome); // Fruta

        if (value) {
          carne = {
            ...carne, // carne == { nome: Melão }
            [campo.nome]: campo.tipo === 'number' ? parseInt(value) : value, // tipo: Fruta
          };
        }
        // carne == { nome: 'Melão', tipo: 'Fruta' }
      });

      if (carne) {
        if (this.id) {
          this.servico.httpUpdateProduto(carne, this.id, 'carnes').subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error) => console.error(error),
          });
          // this.servico.httpUpdateNomeProduto(carne.nome, this.id, 'carnes').subscribe({
          //   next: (retorno) => {
          //     console.log(retorno);
          //     this.router.navigate(['produtos']);

          //   },
          //   error: (error) => console.error(error),
          // })
        } else {
          this.servico.httpCreateProduto(carne, 'carnes').subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error) => console.error(error),
          });
        }
      }
    }
  }

  private getValorFormControl(nome: string): string | null {
    return this.form.get(nome)?.value;
  }

  apagar() {
    if (this.id) {
      this.servico.httpDeleteProduto(this.id, 'carnes').subscribe({
        next: () => {
          console.log('apagou');
          this.form.reset();
          this.router.navigate(['produtos']);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
