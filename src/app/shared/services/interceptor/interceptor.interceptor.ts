import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of, finalize } from 'rxjs';
import { Apiservice } from '../crud/apiservice.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorServices implements HttpInterceptor {
constructor(private _ApiService:Apiservice ) {}
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  let token = this._ApiService.getToken()
  if(token != '' && token != undefined && token != null){
    let lang = ''
    if(this._ApiService.Language == "ar"){
      lang = "ar-EG"
    }else {
      lang = "en-US"
    }
    request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
        setHeaders: { "Accept-Language": lang},
        reportProgress: true,
  });
}

return next.handle(request).pipe(
      catchError((error)=>{

        setTimeout(() => {
          this._ApiService.isLoading = false
        }, 100);

        return of(error)

      }),finalize(()=>{

        setTimeout(() => {
          this._ApiService.isLoading = false
        }, 100);

      })
    )
  }
}
