import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartRef = firebase.database().ref("Carts/").child(firebase.auth().currentUser.uid).child("Items/");
  cartValRef = firebase.database().ref("Carts/").child(firebase.auth().currentUser.uid).child("CartValue/");
  public cartItems : Array<any> = [];
  data : boolean = false;
  totCartValue : number=0;

  constructor(
  public navCtrl: NavController, 
  public app : App,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.app.getRootNav().setRoot(LoginPage);
      }
    });
    this.getCart();
    this.getCartValue()
  }

  ionViewDidEnter(){
    this.getCart();
    this.getCartValue()
  }

  getCart(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.cartRef.once('value', itemSnapshot => {
      this.cartItems = [];
      itemSnapshot.forEach(itemSnap => {
        var item = itemSnap.val();
        item.key = itemSnap.key;
        this.cartItems.push(item);
        return false;
      });
    }).then(()=>{
      if(this.cartItems.length>0){
        this.data = true;
      }else{
        this.data = false;
      }
      loading.dismiss();
    }) ;
  }

  getCartValue(){
    this.cartValRef.once("value",itemVal=>{
      this.totCartValue = itemVal.val();
    })

  }
  
  rfCart(item){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.cartRef.child(item.key).remove().then(()=>{
      this.cartValRef.transaction(function(cData){
        return cData - item.Value;
      }).then(()=>{
      this.getCart();
      this.getCartValue();
      loading.dismiss();
      })
    })
  
}

  order(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

      loading.dismiss();
  }




}
