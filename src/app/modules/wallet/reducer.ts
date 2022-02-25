import { actionTypes } from './action';
import { walletActionTypes } from './types';

export interface walletState {
  fromNetwork: any;
  toNetwork: any;
  selectedToken: any;
  balance: any;
  hash: string;
  destinationAddress: string;
  byte_data: string;
  swapType: string;
  start_swapping: boolean;
  confirmedBlockCounts?: number;
}

export const initialState: walletState = {
  fromNetwork: {},
  toNetwork: {},
  selectedToken: {},
  balance: {},
  hash: '',
  destinationAddress: '',
  byte_data: '',
  swapType: 'swap',
  start_swapping: false,
  confirmedBlockCounts: 0
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
    case actionTypes.SET_DESTINATION_ADDRESS:
      return {
        ...state,
        destinationAddress: action.payload
      };
    case actionTypes.SET_BYTEDATA:
      return {
        ...state,
        byte_data: action.payload
      };
    case actionTypes.SET_SWAP_TYPE:
      return {
        ...state,
        swapType: action.payload
      };
    case actionTypes.SET_START_SWAPPING:
      return {
        ...state,
        start_swapping: action.payload
      };
    case actionTypes.SET_CONFIRMED_BLOCK_COUNTS:
      return {
        ...state,
        confirmedBlockCounts: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
