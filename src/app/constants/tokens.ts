import { ChainId, Token } from '@soy-libs/sdk2';

export const SOY: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
    18,
    'SOY',
    'SoyERC223-Token'
  ),
  [ChainId.CLOTESTNET]: new Token(
    ChainId.CLOTESTNET,
    '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
    18,
    'SOY',
    'SoyERC223-Token'
  )
};

export const WCLO = new Token(ChainId.MAINNET, '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a', 18, 'WCLO', 'Wrapped CLO');
export const DAI = new Token(
  ChainId.MAINNET,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
);
export const USDT = new Token(ChainId.MAINNET, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 18, 'USDT', 'Tether USD');
export const BTCB = new Token(ChainId.MAINNET, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 8, 'WBTC ', 'Wrapped BTC');

export const UST = new Token(
  ChainId.MAINNET,
  '0x692597b009d13C4049a947CAB2239b7d6517875F',
  18,
  'UST',
  'Wrapped UST Token'
);
export const ETH = new Token(
  ChainId.MAINNET,
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  18,
  'WETH',
  'Wrapped Ether'
);
export const USDC = new Token(
  ChainId.MAINNET,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // '0xc950a687e8d08e70fc072ca8c3596b62aef91faf',
  18,
  'USDC',
  'Polygon-Peg USD Coin'
);

const tokens = {
  clo: {
    symbol: 'CLO',
    projectLink: 'https://callisto.network/'
  },
  soy: {
    symbol: 'SOY',
    address: {
      820: '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://app.soy.finance/'
  },
  wclo: {
    symbol: 'WCLO',
    address: {
      820: '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://explorer.callisto.network/token/0xA648A7824780780d272b6811ce8186a11b9c6591'
  },
  busdt: {
    symbol: 'BUSDT',
    address: {
      820: '0xbf6c50889d3a620eb42C0F188b65aDe90De958c4',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://explorer.callisto.network/token/0xbf6c50889d3a620eb42C0F188b65aDe90De958c4'
  },
  cloe: {
    symbol: 'CLOE',
    address: {
      820: '0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://callisto.enterprise/'
  },
  cyt: {
    symbol: 'CYT',
    address: {
      820: '0x6182d2cd59227c20B486a53976dcEeAF38e76Eed',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://callisto.enterprise/'
  },
  ccbnb: {
    symbol: 'ccBNB',
    address: {
      820: '0xCC78D0A86B0c0a3b32DEBd773Ec815130F9527CF',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://callisto.enterprise/'
  },
  cceth: {
    symbol: 'ccETH',
    address: {
      820: '0xcC00860947035a26Ffe24EcB1301ffAd3a89f910',
      20729: ''
    },
    decimals: 18,
    projectLink: 'https://callisto.enterprise/'
  }
};

export default tokens;
