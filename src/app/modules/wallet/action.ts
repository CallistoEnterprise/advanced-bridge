export const actionTypes = {
  SET_FROM_NETWORK: 'SET_FROM_NETWORK',
  SET_TO_NETWORK: 'SET_TO_NETWORK'
};
export function setFromNetwork(payload: any) {
  return { type: actionTypes.SET_FROM_NETWORK, payload };
}

export function setToNetwork(payload: any) {
  return { type: actionTypes.SET_TO_NETWORK, payload };
}
