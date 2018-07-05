import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the ConstructoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructores',
  templateUrl: 'constructores.html',
})
export class ConstructoresPage {

  resultados: any;
  clasificacion: Array<{posicion: string, escuderia: string, puntos: string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.getConstructores()
    .subscribe(result =>{
    this.resultados = result;
    this.resultados = JSON.stringify(this.resultados);
    this.resultados = JSON.parse(this.resultados);
    this.clasificacion = [];
    for(let i = 0; i < this.resultados.MRData.total; i++) {
      this.clasificacion.push({
      posicion: this.resultados.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].positionText,
      puntos: this.resultados.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].points,
      escuderia: this.resultados.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.name
      });
    }
  } ); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructoresPage');
  }

  getConstructores(){
    const url='http://ergast.com/api/f1/current/constructorStandings.json'
    return this.http.get(url);
  }

}
