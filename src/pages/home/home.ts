import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  restaurantRef = firebase.database().ref("Restaurants/");
  restaurants : Array<any> = [];
  restaurantsLoaded : Array<any> =[];

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
    this.getRestaurants();
  }

  ionViewDidEnter(){
    this.getRestaurants();
  }




  getRestaurants(){
    this.restaurantRef.once('value',itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      }) ;
      this.restaurants = tempArray;
      this.restaurantsLoaded = tempArray;
    });
  }
  
  initializeItems(): void {
    this.restaurants = this.restaurantsLoaded;
  }
  getItems(searchbar) {
    console.log(searchbar)
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.restaurants = this.restaurants.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  refresh(){
    this.getRestaurants();
  }
  viewMenu(resto){
    this.navCtrl.push(MenuPage,{rest : resto });
  }

}
