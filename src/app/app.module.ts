import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import {GooglePlus} from '@ionic-native/google-plus';
import { CartPage } from '../pages/cart/cart';
import { OrdersPage } from '../pages/orders/orders';
import { ProfilePage } from '../pages/profile/profile';
import { MenuPage } from '../pages/menu/menu';


firebase.initializeApp({
  apiKey: "AIzaSyAJcctpBmc663-f52DT8SZdO74dFiJk4m0",
  authDomain: "loyalcodebro.firebaseapp.com",
  databaseURL: "https://loyalcodebro.firebaseio.com",
  projectId: "loyalcodebro",
  storageBucket: "loyalcodebro.appspot.com",
  messagingSenderId: "80615788011"
});


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    CartPage,
    OrdersPage,
    ProfilePage,
    MenuPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    CartPage,
    OrdersPage,
    ProfilePage,
    MenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
  ]
})
export class AppModule {}
