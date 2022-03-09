import { Action } from '@ngrx/store';
import { Coin } from '../models/Coin';

export const ADD_COIN = '[Coin] Add';
export const REMOVE_COIN = '[Coin] Remove';
export const UPDATE_COINS_USD = '[Coin] Update Coins USD';

export class AddCoin implements Action {
  readonly type = ADD_COIN;

  constructor(public coin: Coin) {}
}

export class RemoveCoin implements Action {
  readonly type = REMOVE_COIN;

  constructor(public currency: string) {}
}

export class UpdateCoinsUsd implements Action {
  readonly type = UPDATE_COINS_USD;

  constructor(public cryptoValues: object) {}
}

export type All = AddCoin | RemoveCoin | UpdateCoinsUsd;
