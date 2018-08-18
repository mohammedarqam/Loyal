import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import moment from 'moment';


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
  creditAvailable : number = 0;
  
  constructor(
  public navCtrl: NavController, 
  public app : App,
  public alertCtrl : AlertController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.app.getRootNav().setRoot(LoginPage);
      }
    });
    this.getCart();
    this.getCartValue();
    this.getCreditVal();
  }

  ionViewDidEnter(){
    this.getCart();
    this.getCartValue();
    this.getCreditVal();
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

getCreditVal(){
  firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).once("value",creditVal=>{
    var CreditLimit = creditVal.val().CreditLimit;
    var CreditUsed = creditVal.val().CreditUsed;
    this.creditAvailable = CreditLimit - CreditUsed;
  })
}


  creditPermission(){
    let alert = this.alertCtrl.create({
      title: 'Use Credit Balance ?',
      message :"You have "+ this.creditAvailable+ " available in limit.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.order("0")
          }
        },
        {
          text: 'Use',
          handler: data => {
            this.order(this.creditAvailable)
          }
        }
      ]
    });
    alert.present();

  }



  order(credit){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    firebase.database().ref("Orders/").push({
      User : firebase.auth().currentUser.uid,
      Items : this.cartItems,
      Value : this.totCartValue,
      TimeStamp : moment().format(),
      Status : "Pending",
      CreditUsed : credit,
      OrderId : this.genOrderId()
    }).then(()=>{
      this.getCart();
      this.getCartValue();
      loading.dismiss();

    })

  }

  genOrderId(){
    var length = 12,
        charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


}
