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

const incrementCoin = (state: any, newCoin: Coin) => {
  let previousAmount = 0;
  const newCoins = state.coins.filter((coin: Coin) => {
    if (coin.currency == newCoin.currency) {
      previousAmount = coin.amount;
      return false;
    } else {
      return true;
    }
  });
  const newAmount = newCoin.amount + previousAmount;
  const curentUsdValue = state.cryptos[newCoin.currency].USD;
  newCoins.push({
    currency: newCoin.currency,
    amount: newAmount,
    amount_usd: newAmount * curentUsdValue,
  });
  return newCoins;
};

const removeCoin = (coins: Coin[], currency: string) => {
  return coins.filter((v) => v.currency !== currency);
};

export function walletReducer(state: Wallet = defaultState, action: any) {
  let modifiedState: Wallet = defaultState;

  switch (action.type) {
    case '@ngrx/store/init':
      modifiedState = LocalStorageService.loadInfo() || defaultState;
      return modifiedState;

    case WalletActions.ADD_COIN:
      modifiedState = {
        coins: incrementCoin(state, action.coin),
      };
      LocalStorageService.setInfo(modifiedState);
      return newState(state, modifiedState);

    case WalletActions.REMOVE_COIN:
      modifiedState = {
        coins: removeCoin(state.coins, action.currency),
      };
      LocalStorageService.setInfo(modifiedState);
      return newState(state, modifiedState);

    case WalletActions.UPDATE_COINS_USD:
      modifiedState = {
        cryptos: action.cryptoValues,
        coins: state.coins.map((coin) => {
          const curentUsdValue = action.cryptoValues[coin.currency].USD;
          return {
            amount: coin.amount,
            currency: coin.currency,
            amount_usd: coin.amount * curentUsdValue,
          } as Coin;
        }),
      };
      return newState(state, modifiedState);

    default:
      return state;
  }
}
