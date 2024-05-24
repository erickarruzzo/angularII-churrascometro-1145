import { Component } from '@angular/core';
import { PrecoFormularioComponent } from '../../components/preco-formulario/preco-formulario.component';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-criacao-churrasco',
  standalone: true,
  imports: [PrecoFormularioComponent],
  templateUrl: './criacao-churrasco.component.html',
  styleUrl: './criacao-churrasco.component.scss'
})
export class CriacaoChurrascoComponent {

  constructor(private scrollService: ScrollService) { }
  
  rolarToSection(id: string): void {
    this.scrollService.scrollToTop(id);
  }
}
