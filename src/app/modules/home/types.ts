import { actionTypes } from './action';

interface getCoinPriceSuccessAction {
  type: typeof actionTypes.GET_COIN_PRICE_SUCCESS;
  payload: any;
}

export type homeActionTypes = getCoinPriceSuccessAction;
