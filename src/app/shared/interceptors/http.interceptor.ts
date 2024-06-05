import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.getToken();

  req = req.clone({
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate(['/unauthorized']);
      } else if (err.status === 404) {
        router.navigate(['/not-found']);
      }
      return throwError(() => err);
    })
  );
};
