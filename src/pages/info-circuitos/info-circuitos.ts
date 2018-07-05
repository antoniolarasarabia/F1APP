import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Generated class for the InfoCircuitosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-circuitos',
  templateUrl: 'info-circuitos.html',
})
export class InfoCircuitosPage {

  resultados: any;
  circuitName: string;
  circuito:any;
  clasificacion: any;
  disputado: boolean;
  data: string = "carrera";
  mapa: string;

  fecha: string;
  pais: string;
  infoAcicional: string;
  //circuito: Array<{posicion: string, nombre: string, escuderia: string, posInicial: string, vueltaRapida: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.navParams.get('id');
    console.log(this.navParams.data.id);
    this.getCircuitInfo(this.navParams.data.id)
        .subscribe(result => {
          this.resultados = result;
          this.resultados = JSON.stringify(this.resultados);
          this.resultados = JSON.parse(this.resultados);
          this.fecha = this.resultados.MRData.RaceTable.Races[0].date;
          this.pais = this.resultados.MRData.RaceTable.Races[0].Circuit.Location.country;
          this.infoAcicional = this.resultados.MRData.RaceTable.Races[0].url;
        })

    this.getClasificacion(this.navParams.data.id)
        .subscribe(result =>{
          this.resultados = result;
          this.resultados = JSON.stringify(this.resultados);
          this.resultados = JSON.parse(this.resultados);

          console.log('this resultados vale');
          console.log(this.resultados);
          this.clasificacion = [];
          for(let i = 0; i < this.resultados.MRData.total; i++) {
            this.clasificacion[i] = [];
            this.clasificacion[i].posicion = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].position;
            this.clasificacion[i].piloto = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Driver.givenName + ' ' + this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Driver.familyName;
            this.clasificacion[i].escuderia = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Constructor.name;
            this.clasificacion[i].q1 = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q1;

            if(this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q1){
              this.clasificacion[i].tiempo = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q1
            }
            if(this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q2){
              this.clasificacion[i].tiempo = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q2
            }
            if(this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q3){
              this.clasificacion[i].tiempo = this.resultados.MRData.RaceTable.Races[0].QualifyingResults[i].Q3
            }
          }

          console.log(this.clasificacion);
        })




    this.getInfo(this.navParams.data.id)
          .subscribe(result =>{
      this.resultados = result;
      this.resultados = JSON.stringify(this.resultados);
      this.resultados = JSON.parse(this.resultados);

      this.mapa = 'assets/img/map/'+this.navParams.data.id+'.png';
      
      if(this.resultados.MRData.total>0){
        this.disputado = true;
        this.circuito = [];
        this.circuitName = this.resultados.MRData.RaceTable.Races[0].raceName;
        for(let i = 0; i < this.resultados.MRData.total; i++) {
          this.circuito[i] = [];
          this.circuito[i].posicion = this.resultados.MRData.RaceTable.Races[0].Results[i].position;
          this.circuito[i].nombre = this.resultados.MRData.RaceTable.Races[0].Results[i].Driver.givenName + ' ' + this.resultados.MRData.RaceTable.Races[0].Results[i].Driver.familyName;
          this.circuito[i].escuderia = this.resultados.MRData.RaceTable.Races[0].Results[i].Constructor.name;
          this.circuito[i].posInicial = this.resultados.MRData.RaceTable.Races[0].Results[i].grid;

          if(this.resultados.MRData.RaceTable.Races[0].Results[i].FastestLap){
          this.circuito[i].vueltaRapida= this.resultados.MRData.RaceTable.Races[0].Results[i].FastestLap.Time.time
          }else{
            this.circuito[i].vueltaRapida = "No hizo tiempo";
          }
        }
      }else{
        this.disputado = false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoCircuitosPage');
  }

  getInfo(id){
    const url = 'http://ergast.com/api/f1/current/circuits/'+id+'/results.json';
    return this.http.get(url);
  }

  getCircuitInfo(id){
    const url = 'http://ergast.com/api/f1/current/circuits/'+id+'/races.json';
    return this.http.get(url);
  }

  getClasificacion(id){
    const url = 'http://ergast.com/api/f1/current/circuits/'+id+'/qualifying.json';
    return this.http.get(url);
  }

}
