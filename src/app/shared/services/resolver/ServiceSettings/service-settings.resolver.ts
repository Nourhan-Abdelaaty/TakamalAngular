import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Apiservice } from '../../crud/apiservice.service';
import { ResResult } from 'src/app/shared/models/Helper/Response';

@Injectable({
  providedIn: 'root'
})
export class ServiceSettingsResolver implements Resolve<ResResult> {
  constructor(private _Apiservice:Apiservice) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResResult>|Promise<ResResult>|ResResult {
    let Paging = {
      CurrentPage:1,
      PageSize:10
    }
    return this._Apiservice.post("ServicesFixedVariable/GetAllFixed",Paging,true);
  }
}
