import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ResResult } from 'src/app/shared/models/Helper/Response';
import { Apiservice } from '../../crud/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AddressStructureResolver implements Resolve<ResResult> {
  constructor(private _Apiservice:Apiservice) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResResult>|Promise<ResResult>|ResResult {
    return this._Apiservice.get("AddressStructure/GetPageInfo",true);
  }
}
