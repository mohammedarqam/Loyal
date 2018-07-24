import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { ProfilePage } from '../profile/profile';
import { OffersPage } from '../offers/offers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OffersPage;
  tab3Root = CartPage;
  tab4Root = ProfilePage;

  constructor() {
  }
}