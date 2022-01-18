import { actionTypes } from './action';
import { walletActionTypes } from './types';

export interface walletState {
  fromNetwork: any;
  toNetwork: any;
  selectedToken: any;
  balance: any;
  hash: string;
}

export const initialState: walletState = {
  fromNetwork: {},
  toNetwork: {},
  selectedToken: {},
  balance: {},
  hash: ''
};

function reducer(state = initialState, action: walletActionTypes) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SET_FROM_NETWORK:
      return {
        ...state,
        fromNetwork: action.payload
      };
    case actionTypes.SET_TO_NETWORK:
      return {
        ...state,
        toNetwork: action.payload
      };
    case actionTypes.SET_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken: action.payload
      };
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };

    case actionTypes.SET_HASH:
      return {
        ...state,
        hash: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
