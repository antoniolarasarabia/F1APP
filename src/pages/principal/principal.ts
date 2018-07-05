import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { Noticia } from '../../app/noticia';
import { NoticiasProvider } from '../../providers/noticias/noticias';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  public noticia: any;
  private _COLL 		: string 			= "noticias";
  public locations     : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public noticias: NoticiasProvider) {
  }

  ionViewDidLoad() {
    this.retrieveCollection();
  }

  goToOtherPage(pagina) {
    console.log(pagina);
    this.navCtrl.push(pagina);
  }

  retrieveCollection() : void
   {
      this.noticias.getDocuments(this._COLL)
      .then((data) =>
      {

         // IF we don't have any documents then the collection doesn't exist
         // so we create it!
         if(data.length === 0)
         {
            console.log('NO HAY NOTICIAS');
         }

         // Otherwise the collection does exist and we assign the returned
         // documents to the public property of locations so this can be
         // iterated through in the component template
         else
         {
            this.locations = data;
         }
      })
      .catch();
   }

}
