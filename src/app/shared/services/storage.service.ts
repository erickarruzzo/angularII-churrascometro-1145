import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return null;
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return true;
    }
    return false;
  }
}
