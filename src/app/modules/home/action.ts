export const actionTypes = {
  GET_COIN_PRICE: 'GET_COIN_PRICE',
  GET_COIN_PRICE_SUCCESS: 'GET_COIN_PRICE_SUCCESS',
  UPDATE_BLOCK_NUMBER: 'UPDATE_BLOCK_NUMBER'
};
export function getCoinPrice() {
  return { type: actionTypes.GET_COIN_PRICE };
}

export function getCoinPriceSuccess(payload: any) {
  return { type: actionTypes.GET_COIN_PRICE_SUCCESS, payload };
}

export function updateBlockNumber(payload: { chainId: number; blockNumber: number }) {
  return { type: actionTypes.UPDATE_BLOCK_NUMBER, payload };
}
