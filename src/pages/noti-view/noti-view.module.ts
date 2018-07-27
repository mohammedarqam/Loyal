import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotiViewPage } from './noti-view';

@NgModule({
  declarations: [
    NotiViewPage,
  ],
  imports: [
    IonicPageModule.forChild(NotiViewPage),
  ],
})
export class NotiViewPageModule {}
