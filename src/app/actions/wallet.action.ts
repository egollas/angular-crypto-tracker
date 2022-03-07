import { Action } from '@ngrx/store';
import { Coin } from '../models/Coin';

export const ADD_COIN = '[Coin] Add';
export const REMOVE_COIN = '[Coin] Remove';

export class AddCoin implements Action {
  readonly type = ADD_COIN;

  constructor(public coin: Coin) {}
}

export class RemoveCoin implements Action {
  readonly type = REMOVE_COIN;

  constructor(public currency: string) {}
}

export type All = AddCoin | RemoveCoin;
