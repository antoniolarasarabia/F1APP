import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

/**
 * Generated class for the InfoCircuitosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'info-circuitos',
  templateUrl: 'info-circuitos.html'
})
export class InfoCircuitosComponent {

  resultado: any;

  circuitData: Array<{circuito: string, pais: string, info: string}>;


  constructor(private http: HttpClient) {
    this.getCircuitData().subscribe(result =>{
      this.resultado = result;
      this.resultado = JSON.stringify(this.resultado);
      this.resultado = JSON.parse(this.resultado);
      this.circuitData = [];

      for(let i = 0; i < this.resultado.MRData.total; i++) {
        this.circuitData.push({
        circuito: this.resultado.MRData.CircuitTable.Circuits[0].circuitName,
        pais: this.resultado.MRData.CircuitTable.Circuits[0].Location.country,
        info: this.resultado.MRData.CircuitTable.Circuits[0].url
        });
      }
    })
  }

  getCircuitData(){
    const url = 'http://ergast.com/api/f1/circuits/catalunya'
    return this.http.get(url);
  }

}
