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

  coinToAddAmount: string;
  coinToAddCurrency: string;

  constructor(private store: Store<AppState>) {
    this.wallet = this.store.select('wallet');
  }

  ngOnInit(): void {}

  saveCoin() {
    this.store.dispatch(new WalletActions.AddCoin(this.newCoin));
    this.newCoin = new Coin();
  }

  removeCoin(currency: string) {
    this.store.dispatch(new WalletActions.RemoveCoin(currency));
  }
}
