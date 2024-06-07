import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { ChurrascometroService } from '../../services/churrascometro.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { TipoChurrasco } from '../../models/enums/tipoChurrasco.enum';
import { Carnes } from '../../models/carnes.interface';
import { Bebidas } from '../../models/bebidas.interface';

@Component({
  selector: 'app-preco-formulario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  templateUrl: './preco-formulario.component.html',
  styleUrl: './preco-formulario.component.scss',
})
export class PrecoFormularioComponent implements OnInit {
  // formulário
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;
  formTipoChurrasco!: FormGroup;

  carnesLista: { value: string; label: string; tipo: string }[] = [];

  bebidasLista: { value: string; label: string }[] = [];

  tiposChurrasco = Object.values(TipoChurrasco);
  tipoChurrascoSelecionado!: string;

  adultos_total = 0;
  criancas_total = 0;


  valor_total = 0;

  exibirResultados = false;

  getCarnes = this.churrascometroService.getCarnes;
  getBebidas = this.churrascometroService.getBebidas;

  constructor(
    private churrascometroService: ChurrascometroService,
    private formBuilder: FormBuilder
  ) {
    this.formTipoChurrasco = this.formBuilder.group({
      tipoChurrasco: ['', this.radioRequiredValidator()],
    });

    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(0)]),
      criancas: new FormControl(null),
    });

    this.formCarnes = this.formBuilder.group({});

    this.formBebidas = this.formBuilder.group({});

    effect(() => {
      if (this.getBebidas()) {
        this.getBebidas().forEach((bebida: Bebidas) => {
          this.bebidasLista.push({
            value: bebida.nome,
            label: bebida.nome.charAt(0).toUpperCase() + bebida.nome.substring(1),
          })
          this.addFormControl(this.formBebidas, bebida.nome);
        });
      }
      console.log(this.getCarnes())
      if (this.getCarnes()) {
        this.getCarnes().forEach((carne: Carnes) => {
          if (!this.formCarnes.get(carne.nome)) {
            this.carnesLista.push({
              value: carne.nome,
              label: carne.nome.charAt(0).toUpperCase() + carne.nome.substring(1),
              tipo: carne.tipo
            })
            this.addFormControl(this.formCarnes, carne.nome);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.inicializarService();
  }

  inicializarService(): void {
    this.churrascometroService.httpGetCarnes().subscribe();
    this.churrascometroService.httpGetBebidas().subscribe();
  }

  submit(): void {
    if (
      this.formTipoChurrasco.valid &&
      this.formPessoas.valid &&
      this.formCarnes.valid &&
      this.formBebidas.valid
    ) {
      const formPessoasValues = this.formPessoas.value;
      const formCarnesValues = this.formCarnes.value;
      const formBebidasValues = this.formBebidas.value;

      // const adultos = this.formPessoas.get('adultos')?.value;
      // const adultos = this.formPessoas.controls['adultos']?.value;
      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      if (adultos) {
        this.adultos_total = adultos;
      }

      if (criancas) {
        this.criancas_total = criancas;
      }

      this.exibirResultados = true;
    }
  }

  calculaPreco(
    quantAdulto: number,
    quantCrianca: number,
    consumoAdulto: number,
    consumoCrianca: number,
    precoProduto: number
  ) {
    const consumo = quantAdulto * consumoAdulto + quantCrianca * consumoCrianca;
    return (consumo / 1000) * precoProduto;
  }

  calculaValorTotal(): number {
    let valor_total = 0;

    this.getBebidas().forEach((bebida: Bebidas) => {
      valor_total += this.calculaPreco(
        this.adultos_total,
        this.criancas_total,
        bebida.consumo_medio_adulto_ml,
        bebida.consumo_medio_crianca_ml,
        bebida.preco_unidade
      )
    });

    this.getCarnes().forEach((carne: Carnes) => {
      valor_total += this.calculaPreco(
        this.adultos_total,
        this.criancas_total,
        carne.consumo_medio_adulto_g,
        carne.consumo_medio_crianca_g,
        carne.preco_kg
      )
    });

    return valor_total;
  }

  radioRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: true };
    };
  }

  carregaTipoChurrasco() {
    this.tipoChurrascoSelecionado =
      this.formTipoChurrasco.get('tipoChurrasco')?.value;
  }

  private addFormControl(formGroup: FormGroup, fieldName: string, validators: any[] = []): void {
    formGroup.addControl(fieldName, this.formBuilder.control(null, validators));
  }
}
