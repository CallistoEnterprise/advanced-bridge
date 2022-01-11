import { actionTypes } from './action';

interface setFromNetworkAction {
  type: typeof actionTypes.SET_FROM_NETWORK;
  payload: any;
}

interface setToNetworkAction {
  type: typeof actionTypes.SET_TO_NETWORK;
  payload: any;
}

export type walletActionTypes = setFromNetworkAction | setToNetworkAction;
