import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRYPTO_CURRENCIES, MAIN_CURRENCY } from '../../currency.types';

@Injectable({
  providedIn: 'root',
})
export class CryptoFetcherService {
  constructor(private http: HttpClient) {}

  fetchCryptoCurrencies() {
    return this.http.get(this.serverUrl());
  }

  private serverUrl() {
    const currenciesParam = CRYPTO_CURRENCIES.join(',');
    return `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currenciesParam}&tsyms=${MAIN_CURRENCY}`;
  }
}
