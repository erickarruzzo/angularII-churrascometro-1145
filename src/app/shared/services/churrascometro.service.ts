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
  public getProduto = this.produto.asReadonly();

  private error = signal<HttpErrorResponse | null>(null);
  public getError = this.error.asReadonly();

  constructor(private http: HttpClient) { }

  httpGetCarnes(): Observable<Carnes[]> {
    this.error.set(null);
    return this.http.get<Carnes[]>(`${this.API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes)
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    );
  }

  httpGetCarne(id: string): Observable<Carnes> {
    this.error.set(null);
    return this.http.get<Carnes>(`${this.API_URL}/carnes/${id}`).pipe(
      tap((carne) => {
        this.produto.set(carne);
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    );
  }

  httpGetBebidas(): Observable<Bebidas[]> {
    this.error.set(null);
    return this.http.get<Bebidas[]>(`${this.API_URL}/bebidas`).pipe(
      tap((bebidas) => {
        this.bebidas.set(bebidas);
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    )
  }

  httpCreateProduto(produto: any, endpoint: string): Observable<any> {
    this.error.set(null);
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, produto).pipe(
      tap((produto: any) => {
        this.produto.set(produto); 
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    )
  }

  httpUpdateNomeProduto(nome: string, id: string, endpoint: string): Observable<any> {
    this.error.set(null);
    return this.http.patch<any>(`${this.API_URL}/${endpoint}/${id}`, { 'nome': nome }).pipe(
      tap((produto: any) => {
        this.produto.set(produto); 
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    )
  }

  httpUpdateProduto(produto: any, id: string, endpoint: string): Observable<any> {
    this.error.set(null);
    return this.http.put<any>(`${this.API_URL}/${endpoint}/${id}`, produto).pipe(
      tap((produto: any) => {
        this.produto.set(produto); 
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    )
  }

  httpDeleteProduto(id: string, endpoint: string): Observable<void> {
    this.error.set(null);
    return this.http.delete<void>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap(() => {
        this.produto.set(null); 
      }),
      catchError((erro: HttpErrorResponse) => this.handlerError(erro))
    )
  }

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ', error);
    // error = new HttpErrorResponse({
    //   error: 'Erro forçado: Bad Request',
    //   status: 400,
    //   statusText: 'Bad Request'
    // });
    this.error.set(error);
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
