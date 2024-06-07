import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

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

  public removeToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }
}
