import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const canActivateGuard: CanActivateFn = (route, state) => {
  return true;
};
