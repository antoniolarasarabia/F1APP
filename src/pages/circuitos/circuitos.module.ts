import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CircuitosPage } from '../../pages/circuitos/circuitos';

@NgModule({
  declarations: [
    CircuitosPage,
  ],
  imports: [
    IonicPageModule.forChild(CircuitosPage),
  ],
})
export class CircuitosPageModule {}
