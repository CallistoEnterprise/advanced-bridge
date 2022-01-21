export const actionTypes = {
  SET_FROM_NETWORK: 'SET_FROM_NETWORK',
  SET_TO_NETWORK: 'SET_TO_NETWORK',
  SET_SELECTED_TOKEN: 'SET_SELECTED_TOKEN',
  SET_BALANCE: 'SET_BALANCE',
  SET_HASH: 'SET_HASH'
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