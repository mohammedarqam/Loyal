import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  restaurant = this.navParams.get("rest");
  menuRef = firebase.database().ref("Menus");
  menuItems : Array<any>=[];
  cartRef = firebase.database().ref("Carts/").child(firebase.auth().currentUser.uid).child("Items/");
  ftrBtns : boolean = false ;
  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  public navParams: NavParams) {
    this.getMenu();
  }

  increase(i){
    this.menuItems[i].Quantity++;
  }

  decrease(i){
    if(this.menuItems[i].Quantity>0){
      this.menuItems[i].Quantity--;
    }else{
      this.menuItems[i].Quantity = 0;
    }
  }


  ionViewDidEnter(){
    this.getMenu();
  }

getMenu(){
  this.menuRef.child(this.restaurant.key).once('value',itemSnapshot=>{
    this.menuItems = [];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      temp.Quantity = 0;
      this.menuItems.push(temp);
      return false;
    });
  });
}

atCart(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this.menuItems.forEach(item =>{
    if(item.Quantity>0){
      this.cartRef.child(item.key).transaction(function(currentData){
        if(currentData==null){
          item.Value = +item.Price * +item.Quantity;
          return {Name : item.Name, Price : item.Price,Quantity : item.Quantity, Value : item.Value }
        }else{
          item.Value = +item.Price * +item.Quantity;
          currentData.Quantity = currentData.Quantity+ item.Quantity ;
          currentData.Value = currentData.Value + item.Value;
          return {Name : item.Name,Price : item.Price ,Quantity :currentData.Quantity, Value: currentData.Value} ;
        }
      }).then(()=>{

        this.cartRef.parent.child("CartValue").transaction(function(cData){
          if(cData==null){
            item.Value = +item.Price*+item.Quantity;
            return item.Value;
          }else{
            item.Value = +item.Price*+item.Quantity;
            cData = +cData + item.Value;
            return cData;
          }
        }).then(()=>{
          this.ftrBtns = true;
        })
  
      })
    }
  });
  this.presentToast("Items Added");
  this.getMenu();
  loading.dismiss();
}


presentAlert(top,middle){
  let alert = this.alertCtrl.create({
    title: top,
    subTitle: middle,
    buttons: ['Dismiss']
  });
  alert.present();

}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    showCloseButton: false,
  });
  toast.present();
}



}


