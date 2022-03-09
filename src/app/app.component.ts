import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Wallet } from './models/Wallet';
import { CryptoFetcherService } from './services/crypto-fetcher/crypto-fetcher.service';
import * as WalletActions from './actions/wallet.action';

interface AppState {
  wallet: Wallet;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CryptoFetcherService],
})
export class AppComponent implements OnInit {
  constructor(
    private cryptoFetcherService: CryptoFetcherService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fetchCryptoValues();
    setInterval(() => {
      this.fetchCryptoValues();
    }, 5000);
  }

  fetchCryptoValues() {
    this.cryptoFetcherService.fetchCryptoCurrencies().subscribe((data) => {
      this.processCryptoValues(this.store, data);
    });
  }

  processCryptoValues(store: Store<AppState>, data: any) {
    store.dispatch(new WalletActions.UpdateCoinsUsd(data));
  }
}
