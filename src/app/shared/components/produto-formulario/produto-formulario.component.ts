import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carnes } from '../../models/carnes.interface';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { map } from 'rxjs';

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
  form!: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private servico: ChurrascometroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({});

    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required]);
    });
  }

  private addFormControl(fieldName: string, validators: any[] = []) {
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }

  private getFormControlValue(fieldName: string) {
    return this.form.get(fieldName)?.value;
  }

  submit() {
    let carne!: Carnes;

    this.campos.forEach((campo) => {
      const value = this.getFormControlValue(campo.nome);

      if (value) {
        carne = {
          ...carne,
          [campo.nome]: value,
        };
      }
    });

    if (carne) {
      this.servico.httpCreateCarne(carne).subscribe({
        next: (retorno) => {
          this.form.reset();
          console.log(retorno);
        },
        error: (error) => console.error(error),
      });
    }
  }
}
