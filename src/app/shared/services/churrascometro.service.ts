import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, shareReplay, tap, throwError } from 'rxjs';
import { Carnes } from '../models/carnes.interface';
import { Bebidas } from '../models/bebidas.interface';

@Injectable({
  providedIn: 'root',
})
export class ChurrascometroService {
  private API_URL = 'http://localhost:3000';

  private bebidas = signal<Bebidas[]>([]);
  public getBebidas = this.bebidas.asReadonly();
  private carnes = signal<Carnes[]>([]);
  public getCarnes = this.carnes.asReadonly();

  private carne = signal<Carnes | null>(null);
  public createCarne = this.carne.asReadonly();



  constructor(private http: HttpClient) {}

  httpGetCarnes(): Observable<Carnes[]> {
    return this.http.get<Carnes[]>(`${this.API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes);
      }),
      catchError(this.handlerError)
    );
  }

  httpGetBebidas(): Observable<Bebidas[]> {
    return this.http
      .get<Bebidas[]>(`${this.API_URL}/bebidas`)
      .pipe(
        tap((bebidas) => {
          this.bebidas.set(bebidas);
        }),
        catchError(this.handlerError));
  }

  httpCreateCarne(carne: Carnes): Observable<Carnes> {
    return this.http.post<Carnes>(`${this.API_URL}/carnes`, carne).pipe(
      tap((carne) => {
        this.carne.set(carne);        
      })
    )
  }

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }
}
