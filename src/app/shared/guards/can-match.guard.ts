import { CanMatchFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const canMatchGuard: CanMatchFn = (route, segments) => {
  console.log(segments);
  const loginService = inject(LoginService);
  if (loginService.isLoggedIn()) {
    console.log('usuário logado');
    return true;
  }
  console.log('usuário não logado');
  return false;
};
