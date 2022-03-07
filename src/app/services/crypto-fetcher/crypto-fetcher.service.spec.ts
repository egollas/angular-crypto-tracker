import { TestBed } from '@angular/core/testing';

import { CryptoFetcherService } from './crypto-fetcher.service';

describe('CryptoFetcherService', () => {
  let service: CryptoFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
