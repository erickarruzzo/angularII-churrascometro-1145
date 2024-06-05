import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getToken();

  req = req.clone({
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(req).pipe(
    retry({ count: 3, delay: 1000 }),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
       console.log('Erro de autorização')
      }
      return throwError(() => err);
    })
  );
};
