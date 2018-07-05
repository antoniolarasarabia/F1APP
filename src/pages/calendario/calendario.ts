import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  resultados: any;
  asdfg: any;
  est: any;
  circuitos: Array<{circuito: string, pais: string, fecha: string, hora: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient) 
  {
    this.getCircuitos()
        .subscribe(result =>{
                  this.resultados = result;
                  this.resultados = JSON.stringify(this.resultados);
                  this.resultados = JSON.parse(this.resultados);
                  this.circuitos = [];

                  for(let i = 0; i < this.resultados.MRData.total; i++) {
                      this.circuitos.push({
                      circuito: this.resultados.MRData.RaceTable.Races[i].raceName,
                      pais: this.resultados.MRData.RaceTable.Races[i].Circuit.Location.country,
                      fecha: this.resultados.MRData.RaceTable.Races[i].date,
                      hora: this.resultados.MRData.RaceTable.Races[i].time 
                    });
                  }
        } ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage');
  }

  getCircuitos(){
    const url = 'http://ergast.com/api/f1/current.json';
    return this.http.get(url);
  }

}
