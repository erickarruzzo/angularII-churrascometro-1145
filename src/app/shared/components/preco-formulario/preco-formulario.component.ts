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
import { toSignal } from '@angular/core/rxjs-interop';

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

  carnesLista = [
    { value: 'picanha', label: 'Picanha', tipo: 'Normal' },
    { value: 'costela', label: 'Costela', tipo: 'Normal' },
    { value: 'linguica', label: 'Linguiça', tipo: 'Normal' },
    { value: 'frango', label: 'Frango', tipo: 'Normal' },
    { value: 'queijo', label: 'Queijo', tipo: 'Vegetariano' },
    { value: 'abacaxi', label: 'Abacaxi', tipo: 'Vegano' },
  ];

  bebidasLista = [
    { value: 'cerveja', label: 'Cerveja' },
    { value: 'refrigerante', label: 'Refrigerante' },
    { value: 'agua', label: 'Água' },
    { value: 'suco', label: 'Suco' },
  ];

  tiposChurrasco = Object.values(TipoChurrasco);
  tipoChurrascoSelecionado!: string;

  // valores de referência
  preco_picanha = 0;
  preco_costela = 0;
  preco_linguica = 0;
  preco_frango = 0;
  preco_queijo = 0;
  preco_abacaxi = 0;

  consumo_adulto_picanha = 0;
  consumo_crianca_picanha = 0;
  consumo_adulto_costela = 0;
  consumo_crianca_costela = 0;
  consumo_adulto_linguica = 0;
  consumo_crianca_linguica = 0;
  consumo_adulto_frango = 0;
  consumo_crianca_frango = 0;
  consumo_adulto_queijo = 0;
  consumo_crianca_queijo = 0;
  consumo_adulto_abacaxi = 0;
  consumo_crianca_abacaxi = 0;

  preco_cerveja = 0;
  preco_refrigerante = 0;
  preco_agua = 0;
  preco_suco = 0;

  consumo_adulto_cerveja = 0;
  consumo_adulto_refrigerante = 0;
  consumo_crianca_refrigerante = 0;
  consumo_adulto_agua = 0;
  consumo_crianca_agua = 0;
  consumo_adulto_suco = 0;
  consumo_crianca_suco = 0;

  // nome: string = '';

  // valores totais
  adultos_total = 0;
  criancas_total = 0;

  valor_total_picanha = signal(0);
  valor_total_costela = signal(0);
  valor_total_linguica = signal(0);
  valor_total_frango = signal(0);
  valor_total_queijo = signal(0);
  valor_total_abacaxi = signal(0);

  valor_total_cerveja = signal(0);
  valor_total_refrigerante = signal(0);
  valor_total_agua = signal(0);
  valor_total_suco = signal(0);

  valor_total = computed(() => {
    return (
      this.valor_total_picanha() +
      this.valor_total_costela() +
      this.valor_total_linguica() +
      this.valor_total_frango() +
      this.valor_total_queijo() +
      this.valor_total_abacaxi() +
      this.valor_total_cerveja() +
      this.valor_total_refrigerante() +
      this.valor_total_agua() +
      this.valor_total_suco()
    );
  });

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

    this.formCarnes = this.formBuilder.group({
      picanha: new FormControl(null),
      costela: new FormControl(null),
      linguica: new FormControl(null),
      frango: new FormControl(null),
      queijo: new FormControl(null),
      abacaxi: new FormControl(null),
    });

    this.formBebidas = this.formBuilder.group({
      cerveja: new FormControl(null),
      refrigerante: new FormControl(null),
      agua: new FormControl(null),
      suco: new FormControl(null),
    });

    effect(() => {
      if (this.valor_total() > 0) {
        this.exibirResultados = true;
      }
      if (this.getCarnes() !== null && this.getCarnes().length > 0) {
        this.getCarnes().forEach(carne => {
            switch (carne.nome) {
              case 'picanha':
                this.preco_picanha = carne.preco_kg;
                this.consumo_adulto_picanha = carne.consumo_medio_adulto_g;
                this.consumo_crianca_picanha = carne.consumo_medio_crianca_g;
                break;
              case 'costela':
                this.preco_costela = carne.preco_kg;
                this.consumo_adulto_costela = carne.consumo_medio_adulto_g;
                this.consumo_crianca_costela = carne.consumo_medio_crianca_g;
                break;
              case 'linguiça':
                this.preco_linguica = carne.preco_kg;
                this.consumo_adulto_linguica = carne.consumo_medio_adulto_g;
                this.consumo_crianca_linguica = carne.consumo_medio_crianca_g;
                break;
              case 'frango':
                this.preco_frango = carne.preco_kg;
                this.consumo_adulto_frango = carne.consumo_medio_adulto_g;
                this.consumo_crianca_frango = carne.consumo_medio_crianca_g;
                break;
              case 'queijo':
                this.preco_queijo = carne.preco_kg;
                this.consumo_adulto_queijo = carne.consumo_medio_adulto_g;
                this.consumo_crianca_queijo = carne.consumo_medio_crianca_g;
                break;
              case 'abacaxi':
                this.preco_abacaxi = carne.preco_kg;
                this.consumo_adulto_abacaxi = carne.consumo_medio_adulto_g;
                this.consumo_crianca_abacaxi = carne.consumo_medio_crianca_g;
                break;
            }
        });
      }
      if (this.getBebidas() !== null && this.getBebidas().length > 0) {
        this.getBebidas().forEach(bebida => {
          switch (bebida.nome) {
            case 'cerveja':
              this.preco_cerveja = bebida.preco_unidade;
              this.consumo_adulto_cerveja = bebida.consumo_medio_adulto_ml;
              break;
            case 'refrigerante':
              this.preco_refrigerante = bebida.preco_unidade;
              this.consumo_adulto_refrigerante =
                bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_refrigerante =
                bebida.consumo_medio_crianca_ml;
              break;
            case 'água':
              this.preco_agua = bebida.preco_unidade;
              this.consumo_adulto_agua = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_agua = bebida.consumo_medio_crianca_ml;
              break;
            case 'suco':
              this.preco_suco = bebida.preco_unidade;
              this.consumo_adulto_suco = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_suco = bebida.consumo_medio_crianca_ml;
              break;
          }
        });
      }
    })
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
      this.zeraValores();
      const formPessoasValues = this.formPessoas.value;
      const formCarnesValues = this.formCarnes.value;
      const formBebidasValues = this.formBebidas.value;

      // const adultos = this.formPessoas.get('adultos')?.value;
      // const adultos = this.formPessoas.controls['adultos']?.value;
      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      const picanha = formCarnesValues.picanha;
      const costela = formCarnesValues.costela;
      const linguica = formCarnesValues.linguica;
      const frango = formCarnesValues.frango;
      const queijo = formCarnesValues.queijo;
      const abacaxi = formCarnesValues.abacaxi;

      const cerveja = formBebidasValues.cerveja;
      const refrigerante = formBebidasValues.refrigerante;
      const agua = formBebidasValues.agua;
      const suco = formBebidasValues.suco;

      if (adultos) {
        this.adultos_total = adultos;
      }

      if (criancas) {
        this.criancas_total = criancas;
      }

      if (picanha) {
        this.valor_total_picanha.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_picanha,
          this.consumo_crianca_picanha,
          this.preco_picanha
        ));
      }

      if (costela) {
        this.valor_total_costela.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_costela,
          this.consumo_crianca_costela,
          this.preco_costela
        ));
      }

      if (linguica) {
        this.valor_total_linguica.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_linguica,
          this.consumo_crianca_linguica,
          this.preco_linguica
        ));
      }

      if (frango) {
        this.valor_total_frango.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_frango,
          this.consumo_crianca_frango,
          this.preco_frango
        ));
      }

      if (queijo) {
        this.valor_total_queijo.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_queijo,
          this.consumo_crianca_queijo,
          this.preco_queijo
        ));
      }

      if (abacaxi) {
        this.valor_total_abacaxi.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_abacaxi,
          this.consumo_crianca_abacaxi,
          this.preco_abacaxi
        ));
      }

      if (cerveja) {
        this.valor_total_cerveja.update(this.calculaPreco(
          adultos,
          0,
          this.consumo_adulto_cerveja,
          0,
          this.preco_cerveja
        ));
      }

      if (refrigerante) {
        this.valor_total_refrigerante.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_refrigerante,
          this.consumo_crianca_refrigerante,
          this.preco_refrigerante
        ));
      }

      if (agua) {
        this.valor_total_agua.update(this.calculaPreco(
          adultos,
          criancas,
          this.consumo_adulto_agua,
          this.consumo_crianca_agua,
          this.preco_agua
        ));
      }

      if (suco) {
        this.valor_total_suco.update(
          this.calculaPreco(
            adultos,
            criancas,
            this.consumo_adulto_suco,
            this.consumo_crianca_suco,
            this.preco_suco
          )
        );
      }
    }
  }

  zeraValores(): void {
    this.valor_total_picanha.set(0);
    this.valor_total_costela.set(0);
    this.valor_total_linguica.set(0);
    this.valor_total_frango.set(0);
    this.valor_total_queijo.set(0);
    this.valor_total_abacaxi.set(0);
    this.valor_total_cerveja.set(0);
    this.valor_total_refrigerante.set(0);
    this.valor_total_agua.set(0);
    this.valor_total_suco.set(0);
  }

  calculaPreco(
    quantAdulto: number,
    quantCrianca: number,
    consumoAdulto: number,
    consumoCrianca: number,
    precoProduto: number
  ) {
    const consumo = quantAdulto * consumoAdulto + quantCrianca * consumoCrianca;
    return computed(() => {
      return (consumo / 1000) * precoProduto;
    });
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
}
