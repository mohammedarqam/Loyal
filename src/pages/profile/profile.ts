import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { OrdersPage } from '../orders/orders';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
  public navCtrl: NavController, 
  public app : App,
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.app.getRootNav().setRoot(LoginPage);
      }
    });
  }






  gtOrders(){
    this.navCtrl.push(OrdersPage);
  }
  logOut(){
    firebase.auth().signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    })
  }

}
