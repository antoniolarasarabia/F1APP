import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { CircuitosPage } from '../pages/circuitos/circuitos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule }    from '@angular/common/http';
import { ClasificacionPage } from '../pages/clasificacion/clasificacion';
import { ConstructoresPage } from '../pages/constructores/constructores';
import { PrincipalPage } from '../pages/principal/principal';
import { CalendarioPage } from '../pages/calendario/calendario';
import { InfoCircuitosPage } from '../pages/info-circuitos/info-circuitos';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
 
import { NoticiasProvider } from '../providers/noticias/noticias'

export const firebaseConfig = {
  apiKey: "AIzaSyAzddUltrHUyONv-4LTsDpcBXM9kahL2Eg",
  authDomain: "f1scoreapp.firebaseapp.com",
  databaseURL: "https://f1scoreapp.firebaseio.com",
  projectId: "f1scoreapp",
  storageBucket: "f1scoreapp.appspot.com",
  messagingSenderId: "384989358342"
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CircuitosPage,
    ClasificacionPage,
    ConstructoresPage,
    PrincipalPage,
    CalendarioPage,
    InfoCircuitosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CircuitosPage,
    ClasificacionPage,
    ConstructoresPage,
    PrincipalPage,
    CalendarioPage,
    InfoCircuitosPage
  ],
  providers: [
    StatusBar,
    NoticiasProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
