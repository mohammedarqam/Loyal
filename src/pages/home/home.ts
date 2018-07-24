import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
  public navCtrl: NavController,
  public app : App,
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.app.getRootNav().setRoot(LoginPage);
      }
    });
  }



}
