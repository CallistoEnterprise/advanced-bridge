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

interface SetBalance {
  type: typeof actionTypes.SET_BALANCE;
  payload: any;
}

interface SetHash {
  type: typeof actionTypes.SET_HASH;
  payload: any;
}

interface SetDestinationAddressAction {
  type: typeof actionTypes.SET_DESTINATION_ADDRESS;
  payload: any;
}

export type walletActionTypes =
  | setFromNetworkAction
  | setToNetworkAction
  | SetSelectedTokenAction
  | SetBalance
  | SetHash
  | SetDestinationAddressAction;
