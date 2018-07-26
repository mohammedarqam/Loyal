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

  cartRef = firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).child("Cart/");
  public cartItems : Array<any> = [];
  data : boolean = false;
  totCartValue : number;

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
    this.cartRef.parent.child("CartValue").once("value",itemVal=>{
      this.totCartValue = itemVal.val();
      console.log(this.totCartValue);
    })

  }
  
  rfCart(key){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.cartRef.child(key).remove().then(()=>{
      this.getCart();
    }).then(()=>{
      loading.dismiss();
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
