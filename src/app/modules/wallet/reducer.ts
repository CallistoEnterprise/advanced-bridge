import { actionTypes } from './action';
import { walletActionTypes } from './types';

export interface walletState {
  fromNetwork: any;
  toNetwork: any;
}

export const initialState: walletState = {
  fromNetwork: {},
  toNetwork: {}
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
    default:
      return state;
  }
}

export default reducer;
