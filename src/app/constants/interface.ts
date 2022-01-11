export interface INetwork {
  name: string;
  symbol: string;
  devNet: string;
  img: string;
  chainId: string;
  rpcs: Array<string>;
  explorer: string;
}

export interface IToken {
  name: string;
  symbol: string;
  icon: string;
  decimals: {
    CLO: number;
    BNB: number;
    ETH: number;
    ETC: number;
  };
  addresses: {
    CLO: string;
    BNB: string;
    ETH: string;
    ETC: string;
  };
  addressesTest?: {
    CLO: string;
    BNB: string;
    ETH: string;
  };
}
