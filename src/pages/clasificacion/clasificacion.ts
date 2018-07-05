import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the ClasificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clasificacion',
  templateUrl: 'clasificacion.html',
})
export class ClasificacionPage {

  resultados: any;
  clasificacion: Array<{posicion: string, piloto: string, puntos: string, escuderia: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.getClasificacion()
            .subscribe(result =>{
            this.resultados = result;
            this.resultados = JSON.stringify(this.resultados);
            this.resultados = JSON.parse(this.resultados);
            this.clasificacion = [];
      for(let i = 0; i < this.resultados.MRData.total; i++) {
        this.clasificacion.push({
          posicion: this.resultados.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].positionText,
          piloto: this.resultados.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName,
          puntos: this.resultados.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points,
          escuderia: this.resultados.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name
        });
      }
    } ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClasificacionPage');
  }

  getClasificacion(){
    const url = 'http://ergast.com/api/f1/current/driverStandings.json'
    return this.http.get(url);
  }

}
