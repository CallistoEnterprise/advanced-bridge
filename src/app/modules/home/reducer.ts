import { actionTypes } from './action';
import { homeActionTypes } from './types';

export interface IPriceData {
  USD: number | 0;
  USD_MARKET_CAP: number | 0;
  USD_24H_VOL: number | 0;
  USD_24H_CHANGE: number | 0;
}

export interface HomeState {
  networkStatus: boolean | null;
  coinPrice: IPriceData;
  readonly blockNumber: { readonly [chainId: number]: number };
}

export const initialState: HomeState = {
  networkStatus: false,
  coinPrice: {
    USD: 0,
    USD_MARKET_CAP: 0,
    USD_24H_VOL: 0,
    USD_24H_CHANGE: 0
  },
  blockNumber: {}
};

function reducer(state = initialState, action: homeActionTypes) {
  switch (action.type) {
    case actionTypes.GET_COIN_PRICE_SUCCESS:
      return {
        ...state,
        ...{ coinPrice: action.payload }
      };
    case actionTypes.UPDATE_BLOCK_NUMBER:
      const bN =
        typeof state.blockNumber[action.payload.chainId] !== 'number'
          ? action.payload.blockNumber
          : Math.max(action.payload.blockNumber, state.blockNumber[action.payload.chainId]);
      return {
        ...state,
        blockNumber: bN
      };
    default:
      return state;
  }
}

export default reducer;
