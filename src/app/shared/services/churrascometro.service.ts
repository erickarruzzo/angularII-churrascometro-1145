import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Carnes } from '../models/carnes.interface';
import { Bebidas } from '../models/bebidas.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private API_URL = 'http://localhost:3000';

  private carnes = signal<Carnes[]>([]);
  public getCarnes = this.carnes.asReadonly();

  private bebidas = signal<Bebidas[]>([]);
  public getBebidas = this.bebidas.asReadonly();

  private produto = signal<any | null>(null);

  constructor(private http: HttpClient) { }

  httpGetCarnes(): Observable<Carnes[]> {
    return this.http.get<Carnes[]>(`${this.API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes)
      }),
      catchError(this.handlerError)
    );
  }

  httpGetBebidas(): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(`${this.API_URL}/bebidas`).pipe(
      tap((bebidas) => {
        this.bebidas.set(bebidas);
      }),
      catchError(this.handlerError)
    )
  }

  httpCreateProduto(carne: any, endpoint: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, carne).pipe(
      tap((produto: any) => {
        this.produto.set(produto); 
      }),
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }


  // private getPrecoCarneByName(nome: string): Observable<number> {
  //   return this.http.get<any[]>(`${this.API_URL}/carnes`).
  //     pipe(
  //       map(carnes => {
  //         const carne = carnes.find((carne: { nome: string }) => carne.nome === nome);

  //         if (carne) {
  //           return carne.preco_kg;
  //         }
  //       }),
  //       catchError(
  //         this.handlerError
  //       )
  //     );
  // }

  // getPrecoPicanha(): Observable<number> {
  //   return this.getPrecoCarneByName('picanha');
  // }
}
