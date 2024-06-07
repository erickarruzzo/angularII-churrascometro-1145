import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  console.log(state.url);
  const loginService = inject(LoginService);
  if (loginService.isLoggedIn()) {
    console.log('usuário logado');
    return true;
  }
  console.log('usuário não logado');
  return false;
};
