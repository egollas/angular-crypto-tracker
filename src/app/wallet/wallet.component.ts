import { Component, OnInit } from '@angular/core';
import { Coin } from '../models/Coin';
import { CRYPTO_CURRENCIES } from '../currency.types';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Wallet } from '../models/Wallet';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as WalletActions from '../actions/wallet.action';

interface AppState {
  wallet: Wallet;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [LocalStorageService],
})
export class WalletComponent implements OnInit {
  wallet: Observable<Wallet>;
  newCoin: Coin = new Coin();
  allowedCurrencies = CRYPTO_CURRENCIES;
  // localData = [];

  coinToAddAmount: string;
  coinToAddCurrency: string;

  constructor(
    // private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.wallet = this.store.select('wallet');
  }

  ngOnInit(): void {
    // const localData = this.localStorageService.loadInfo();
    // if (localData) this.coins = localData;
  }

  saveCoin() {
    this.store.dispatch(new WalletActions.AddCoin(this.newCoin));
    this.newCoin = new Coin();
    // if (this.newCoin.amount && this.newCoin.currency) {
    //   const existingCoin = this.coins.find((c) => {
    //     return c.currency == this.newCoin.currency;
    //   });
    //   if (existingCoin) {
    //     existingCoin.amount += this.newCoin.amount;
    //   } else {
    //     this.coins.push(this.newCoin);
    //   }
    //   this.newCoin = new Coin();
    //   this.localStorageService.setInfo(this.coins);
    // }
  }

  removeCoin(currency: string) {
    this.store.dispatch(new WalletActions.RemoveCoin(currency));
    // this.coins = this.coins.filter((v, i) => i !== index);
  }
}
