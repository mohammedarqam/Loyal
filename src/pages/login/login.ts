import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
  public navCtrl: NavController,
  public googleplus : GooglePlus, 
  public toastCtrl : ToastController,
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }else{
        loading.dismiss();
      }
    });
  }


  
  login(){
    this.googleplus.login({
      'webClientId': '80615788011-1tpkitmqp8u0hlvfhlcc3q1dt53qt01j.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).once("value",userSnap=>{
          if(userSnap.exists){
            this.presentToast("Logged In");
            this.navCtrl.setRoot(TabsPage);
  
          }else{
    
    
        firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
          Name : suc.displayName,
          Email : suc.email,
          ProPic : suc.photoURL,
          CreditLimit : 0,
          CreditUsed: 0
        }).then(()=>{
          this.presentToast("Logged In");
          this.navCtrl.setRoot(TabsPage);
        })
    }
        })
      
      }).catch(ns=>{
        this.presentToast("Error Occured !! Try Again");
      })
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();


  }



}
