/// <reference types="react-scripts" />

interface Window {
    ethereum?: {
      isMetaMask?: true;
      request?: (...args: any[]) => Promise<void>;
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
      autoRefreshOnNetworkChange?: boolean
    };
    web3?: {}
}