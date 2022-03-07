import * as WalletActions from '../actions/wallet.action';
import { Coin } from '../models/Coin';
import { Wallet } from '../models/Wallet';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

export type Action = WalletActions.All;

const defaultState: Wallet = {
  coins: [],
};

const newState = (state: any, newData: any) => {
  return Object.assign({}, state, newData);
};

const incrementCoin = (coins: Coin[], newCoin: Coin) => {
  let previousAmount = 0;
  const newCoins = coins.filter((coin) => {
    if (coin.currency == newCoin.currency) {
      previousAmount = coin.amount;
      return false;
    } else {
      return true;
    }
  });
  newCoins.push({
    currency: newCoin.currency,
    amount: newCoin.amount + previousAmount,
  });
  return newCoins;
};

const removeCoin = (coins: Coin[], selectedCoin: Coin) => {
  return coins.filter((v) => v.currency !== selectedCoin.currency);
};

export function walletReducer(state: Wallet = defaultState, action: any) {
  let modifiedState: Wallet = defaultState;

  switch (action.type) {
    case '@ngrx/store/init':
      modifiedState = LocalStorageService.loadInfo() || defaultState;
      return modifiedState;

    case WalletActions.ADD_COIN:
      modifiedState = {
        coins: incrementCoin(state.coins, action.coin),
      };
      LocalStorageService.setInfo(modifiedState);
      return newState(state, modifiedState);

    case WalletActions.REMOVE_COIN:
      modifiedState = {
        coins: removeCoin(state.coins, action.currency),
      };
      LocalStorageService.setInfo(modifiedState);
      return newState(state, modifiedState);

    default:
      return state;
  }
}
