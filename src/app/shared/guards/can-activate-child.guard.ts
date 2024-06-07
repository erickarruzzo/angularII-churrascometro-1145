import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  console.log(state.url);
  const loginService = inject(LoginService);
  if (loginService.isLoggedIn()) {
    console.log('usuário logado');
    return true;
  }
  console.log('usuário não logado');
  return false;
};
