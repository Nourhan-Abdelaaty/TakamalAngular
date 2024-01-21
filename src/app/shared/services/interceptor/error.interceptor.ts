import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Apiservice } from '../crud/apiservice.service';
import { isPlatformServer } from '@angular/common';
import {  PLATFORM_ID, Inject  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})


export class ErrorInterceptor implements HttpInterceptor {
  errorArr:any[] = []
  isServer:boolean = false

  constructor(
    private _Router:Router,
    private toastr:ToastrService,
    @Inject(PLATFORM_ID) platformID:Object,
    private _Apiservice:Apiservice) {

    this.isServer = isPlatformServer(platformID)

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(err=>{
        console.log(err)

       if(err.status == 404){
          this._Router.navigate(['/App/NotFound'])
       }

       if(err.status == 403){
        this.toastr.error(`${err.Message}`)
       }

       if(err.status == 401){
        this.toastr.error("غير مسموح")
        this._Router.navigate(['/App/Forbidden'])
       }

       if(err.status == 400 ){
        if(err.error.Message == undefined){
          this.toastr.error(`${err.error}`)
        }else {
          this.toastr.error(`${err.error.Message}`)
        }
       }
       else if(err.status == 415){

       this.toastr.error("طلب فارغ")

       }
       else if(err.status == 501){

       }
       else if(err.status == 0){
        // this._Router.navigate(['/NoConnection'])
          this.toastr.error("الخادم غير متصل")
       }
       else if(err.status == 500){
          this.toastr.error("مشكلة بالخادم")
       }
        return throwError(()=> err )
      })
    )


  }
}
