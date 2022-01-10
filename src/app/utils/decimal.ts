import BigNumber from 'bignumber.js';
import contracts from '~/app/constants/contracts';

const BIG_TEN = new BigNumber(10);

export const getBridgeAddress = (chainId: number) => {
  return contracts.bridge[chainId];
};

export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals));
};

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};
