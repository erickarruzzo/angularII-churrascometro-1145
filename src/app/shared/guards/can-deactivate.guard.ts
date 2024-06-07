import { CanDeactivateFn } from '@angular/router';
import { PrecoFormularioComponent } from '../components/preco-formulario/preco-formulario.component';

export const canDeactivateGuard: CanDeactivateFn<PrecoFormularioComponent> = (component, currentRoute, currentState, nextState) => {
  console.log(component);
  return confirm('Você não criou o churrasco.Tem certeza que deseja sair?');
};
