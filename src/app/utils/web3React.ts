import { BscConnector } from '@binance-chain/bsc-connector';
import { ConnectorNames } from '@soy-libs/uikit';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';
import getNodeUrl from './getRpcUrl';

const POLLING_INTERVAL = 12000;
const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const injected = new InjectedConnector({ supportedChainIds: [1, 4, 56, 61, 820, 20729, 97] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  // bridge: 'https://bridge.walletconnect.org/',
  qrcode: true
  // pollingInterval: 12000
  // supportedChainIds: [1, 4, 56, 61, 820, 20729, 97]
});

const bscConnector = new BscConnector({ supportedChainIds: [1, 4, 56, 61, 820, 20729, 97] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
};

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
