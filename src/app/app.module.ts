import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import {GooglePlus} from '@ionic-native/google-plus';


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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
  ]
})
export class AppModule {}
