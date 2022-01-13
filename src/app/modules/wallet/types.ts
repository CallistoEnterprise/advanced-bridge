import { actionTypes } from './action';

interface setFromNetworkAction {
  type: typeof actionTypes.SET_FROM_NETWORK;
  payload: any;
}

interface setToNetworkAction {
  type: typeof actionTypes.SET_TO_NETWORK;
  payload: any;
}

interface SetSelectedTokenAction {
  type: typeof actionTypes.SET_SELECTED_TOKEN;
  payload: any;
}

export type walletActionTypes = setFromNetworkAction | setToNetworkAction | SetSelectedTokenAction;
