import { actionTypes } from './action';
import { walletActionTypes } from './types';

export interface walletState {
  fromNetwork: any;
  toNetwork: any;
  selectedToken: any;
}

export const initialState: walletState = {
  fromNetwork: {},
  toNetwork: {},
  selectedToken: {}
};

function reducer(state = initialState, action: walletActionTypes) {
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
    default:
      return state;
  }
}

export default reducer;
