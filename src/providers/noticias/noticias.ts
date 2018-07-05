import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from '@firebase/util';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Noticia} from '../../app/noticia'

import * as firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the NoticiasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoticiasProvider {

  private _DB: any;

  constructor(public http: HttpClient){    
    console.log('Hello DatabaseProvider Provider');
    this._DB = firebase.firestore();
  }
  
  getDocuments(collectionObj: string) : Promise<any>{
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj)
      .get()
      .then((querySnapshot) => {
        let obj : any = [];

        querySnapshot
        .forEach((doc: any) => {
          obj.push({
           id: doc.id,
           titular: doc.data().titular,
           noticia: doc.data().noticia
          });
        });

        resolve(obj);
      })
      .catch((error : any) => {
        reject(error);
      });
    });
  }

}
