import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-noti-view',
  templateUrl: 'noti-view.html',
})
export class NotiViewPage {

  noti = this.navParams.get("noti");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }

  
}
