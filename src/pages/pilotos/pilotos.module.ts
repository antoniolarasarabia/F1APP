import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PilotosPage } from './pilotos';

@NgModule({
  declarations: [
    PilotosPage,
  ],
  imports: [
    IonicPageModule.forChild(PilotosPage),
  ],
})
export class PilotosPageModule {}
