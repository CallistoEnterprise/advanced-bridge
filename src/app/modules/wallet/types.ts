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

interface SetByteData {
  type: typeof actionTypes.SET_DESTINATION_ADDRESS;
  payload: any;
}

interface SetSwapType {
  type: typeof actionTypes.SET_SWAP_TYPE;
  payload: any;
}

interface SetStartSwapping {
  type: typeof actionTypes.SET_START_SWAPPING;
  payload: any;
}

export type walletActionTypes =
  | setFromNetworkAction
  | setToNetworkAction
  | SetSelectedTokenAction
  | SetBalance
  | SetHash
  | SetDestinationAddressAction
  | SetByteData
  | SetSwapType
  | SetStartSwapping
  | any;
