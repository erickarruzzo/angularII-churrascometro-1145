import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carnes } from '../../models/carnes.interface';

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
  styleUrl: './produto-formulario.component.scss'
})
export class ProdutoFormularioComponent implements OnInit {
  campos = [
    { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
    { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
    { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
    { nome: 'consumo_medio_adulto_g', tipo: 'number', placeholder: 'Consumo médio por adulto (g)' },
    { nome: 'consumo_medio_crianca_g', tipo: 'number', placeholder: 'Consumo médio por criança (g)' },
  ];

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servico: ChurrascometroService
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required])
    });
  }

  private addFormControl(fieldName: string, validators: any[] = []): void {
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
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
            [campo.nome]: campo.tipo === "number" ? parseInt(value) : value // tipo: Fruta
          }
        }
        // carne == { nome: 'Melão', tipo: 'Fruta' }
      })

      if (carne) {
        this.servico.httpCreateProduto(carne, 'carnes').subscribe({
          next: (retorno) => {
            this.form.reset();
            console.log(retorno);
          },
          error: (error) => console.error(error),
        })
      }
    }
  }

  private getValorFormControl(nome: string): string | null {
    return this.form.get(nome)?.value;
  }
}
