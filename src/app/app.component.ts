import { Component, OnInit } from '@angular/core';
import { CryptoFetcherService } from './services/crypto-fetcher/crypto-fetcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CryptoFetcherService],
})
export class AppComponent implements OnInit {
  constructor(private cryptoFetcherService: CryptoFetcherService) {}

  ngOnInit(): void {
    this.cryptoFetcherService
      .fetchCryptoCurrencies()
      .subscribe(this.processCryptoValues);
  }

  processCryptoValues(data: any) {
    console.log(data);
  }
}
