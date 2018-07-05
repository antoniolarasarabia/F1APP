import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'https://ergast.com/api/f1/current/circuits.json';

/*
  Generated class for the CircuitosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CircuitosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CircuitosProvider Provider');
  }

  getCircuitos(){
    return this.http.get(url);
  }

}
