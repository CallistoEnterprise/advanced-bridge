import { actionTypes } from './action';

// type COIN_PRICE = {
//   USD: number;
//   USD_MARKET_CAP: number;
//   USD_24H_VOL: number;
//   USD_24H_CHANGE: number;
// };
interface getCoinPriceSuccessAction {
  type: typeof actionTypes.GET_COIN_PRICE_SUCCESS;
  payload: any;
}

interface updateBlockNumberAction {
  type: typeof actionTypes.UPDATE_BLOCK_NUMBER;
  payload: any;
}

export type homeActionTypes = getCoinPriceSuccessAction | updateBlockNumberAction | any;
