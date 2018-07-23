import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
  public navCtrl: NavController,
  public googleplus : GooglePlus, 
  public navParams: NavParams) {
  }

  login(){
    this.googleplus.login({
      'webClientId': '80615788011-1tpkitmqp8u0hlvfhlcc3q1dt53qt01j.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        alert("Logged In");
      }).catch(ns=>{
        alert("Not Logged In");
      })
    })
  }

}
