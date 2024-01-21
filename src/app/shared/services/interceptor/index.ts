import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { ErrorInterceptor } from "./error.interceptor"
import { InterceptorServices } from "./interceptor.interceptor"



export const httpInterceptorProviders = [
  {provide:HTTP_INTERCEPTORS , useClass:InterceptorServices , multi:true},
  {provide:HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true}

]
