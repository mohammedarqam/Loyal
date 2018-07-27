import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { NotiViewPage } from '../noti-view/noti-view';



@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notiRef= firebase.database().ref("User Notifications/");
  notifications : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getNotifications();
  }

  ionViewDidEnter(){
    this.getNotifications();
  }

  getNotifications(){
    this.notifications = [];
    this.notiRef.once('value',itemSnapshot=>{
      this.notifications = [];
      itemSnapshot.forEach(itemSnap =>{
        this.notifications.push(itemSnap.val());
        this.notifications.reverse();
        return false;
      });
    });
  
  }

  notiView(noti){
  this.navCtrl.push(NotiViewPage,{noti : noti});
}
}
