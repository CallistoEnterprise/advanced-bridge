export const actionTypes = {
  SET_FROM_NETWORK: 'SET_FROM_NETWORK',
  SET_TO_NETWORK: 'SET_TO_NETWORK',
  SET_SELECTED_TOKEN: 'SET_SELECTED_TOKEN',
  SET_BALANCE: 'SET_BALANCE',
  SET_HASH: 'SET_HASH',
  SET_DESTINATION_ADDRESS: 'SET_DESTINATION_ADDRESS',
  SET_BYTEDATA: 'SET_BYTEDATA',
  SET_SWAP_TYPE: 'SET_SWAP_TYPE',
  SET_START_SWAPPING: 'SET_START_SWAPPING',
  SET_CONFIRMED_BLOCK_COUNTS: 'SET_CONFIRMED_BLOCK_COUNTS'
};
export function setFromNetwork(payload: any) {
  return { type: actionTypes.SET_FROM_NETWORK, payload };
}

export function setToNetwork(payload: any) {
  return { type: actionTypes.SET_TO_NETWORK, payload };
}

export function setSelectedToken(payload: any) {
  return { type: actionTypes.SET_SELECTED_TOKEN, payload };
}

export function setBalance(payload: any) {
  return { type: actionTypes.SET_BALANCE, payload: payload };
}

export function setHash(payload: any) {
  return { type: actionTypes.SET_HASH, payload: payload };
}

export function setDestinationAddress(payload: any) {
  return { type: actionTypes.SET_DESTINATION_ADDRESS, payload: payload };
}

export function setBytedata(payload: any) {
  return { type: actionTypes.SET_BYTEDATA, payload: payload };
}

export function setSwapType(payload: any) {
  return { type: actionTypes.SET_SWAP_TYPE, payload: payload };
}

export function setStartSwapping(payload: any) {
  return { type: actionTypes.SET_START_SWAPPING, payload: payload };
}

export function setConfirmedBlockCounts(payload: number) {
  return { type: actionTypes.SET_CONFIRMED_BLOCK_COUNTS, payload: payload };
}
