export const COINGECKO_URL = 'https://api.coingecko.com/api/v3/';
export const STAKE_URL = 'https://wallet.callisto.network/';
export const GETCLO_URL = 'https://trading.bitfinex.com/t/CLO:USD?demo=true';

export const deposit_event_abi = [
  { type: 'address', name: 'token', internalType: 'address', indexed: true },
  { type: 'address', name: 'sender', internalType: 'address', indexed: true },
  { type: 'uint256', name: 'value', internalType: 'uint256', indexed: false },
  { type: 'uint256', name: 'toChainId', internalType: 'uint256', indexed: false },
  { type: 'address', name: 'toToken', internalType: 'address', indexed: false }
];

export const blockConfirmations: { [chainId: number]: number } = {
  '20729': 12,
  '820': 64,
  '97': 3,
  '56': 3,
  '1': 4,
  '42': 4,
  '61': 12,
  '199': 4
};
