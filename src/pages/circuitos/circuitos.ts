import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoCircuitosPage } from '../info-circuitos/info-circuitos';

// tslint:disable: no-unused-variable
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
// tslint:enable: no-unused-variable




/**
 * Generated class for the CircuitosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circuitos',
  templateUrl: 'circuitos.html',
})
export class CircuitosPage {

  resultados: any;
  circuitos: Array<{circuito: string, localidad: string, pais: string, image: string, id: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient) {
    this.getCircuitos()
            .subscribe(result =>{
            this.resultados = result;
            this.resultados = JSON.stringify(this.resultados);
            this.resultados = JSON.parse(this.resultados);
            this.circuitos = [];
      for(let i = 0; i < this.resultados.MRData.total; i++) {
        this.circuitos.push({
          circuito: this.resultados.MRData.RaceTable.Races[i].Circuit.circuitName,
          localidad: this.resultados.MRData.RaceTable.Races[i].Circuit.Location.locality,
          pais:this.resultados.MRData.RaceTable.Races[i].Circuit.Location.country,
          image: 'assets/img/'+this.resultados.MRData.RaceTable.Races[i].Circuit.Location.country +'.jpg',
          id: this.resultados.MRData.RaceTable.Races[i].Circuit.circuitId
        });
      }
    } ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CircuitosPage');
  }


  getCircuitos(){
    const url = 'http://ergast.com/api/f1/current.json';
    return this.http.get(url);
  }

  openPage(id) {
    this.navCtrl.push(InfoCircuitosPage, {
      id: id
    });
  }


}
