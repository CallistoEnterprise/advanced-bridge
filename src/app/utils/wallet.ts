// Set of helper functions to facilitate wallet setup
declare let window: any;
const BASE_URL = 'https://callistobridge.netlify.app';
/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (curNet: any) => {
  const provider: any = window.ethereum;

  if (provider) {
    const chainId = parseInt(curNet.chainId, 10);
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: `${curNet.name}`,
            nativeCurrency: {
              name: `${curNet.name}`,
              symbol: `${curNet.symbol}`,
              decimals: 18
            },
            rpcUrls: curNet.rpcs,
            blockExplorerUrls: [`${curNet.explorer}`]
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
};
export const setupEthereumNetwork = async (curNet: any) => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(curNet.chainId, 10);
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  } else {
    console.error("Can't setup the Ethereum network on metamask because window.ethereum is undefined");
    return false;
  }
};

export const switchNetwork = async (curNet: any) => {
  const provider = window.ethereum;

  if (provider) {
    const chainId = parseInt(curNet.chainId, 10);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`
            // fallbackRpc: {
            //   chainId: `0x${chainId.toString(16)}`,
            //   chainName: `${curNet.name}`,
            //   rpcUrl: curNet.rpcs[0],
            //   nativeCurrency: {
            //     name: `${curNet.name}`,
            //     symbol: `${curNet.symbol}`,
            //     decimals: parseInt(curNet.decimals)
            //   },
            //   blockExplorerUrl: `${curNet.explorer}`
            // }
          }
        ]
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: `${curNet.name}`,
                rpcUrls: curNet.rpcs[0],
                nativeCurrency: {
                  name: `${curNet.name}`,
                  symbol: `${curNet.symbol}`,
                  decimals: parseInt(curNet.decimals)
                },
                blockExplorerUrls: `${curNet.explorer}`
              }
            ]
          });
        } catch (error: any) {
          alert(error.message);
        }
      }
      return false;
    }
  } else {
    console.error("Can't switch network on metamask because window.ethereum is undefined");
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/${tokenAddress}.png`
      }
    }
  });

  return tokenAdded;
};
