import { CanDeactivateFn } from '@angular/router';
import DetalheChurrascoComponent from '../../pages/detalhe-churrasco/detalhe-churrasco.component';

export const canDeactivateGuard: CanDeactivateFn<DetalheChurrascoComponent> = (component, currentRoute, currentState, nextState) => {
  return confirm('Deseja sair do formulário?');
};
