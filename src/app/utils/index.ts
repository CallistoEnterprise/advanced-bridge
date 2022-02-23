import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { JSBI, Percent } from '@soy-libs/sdk2';
import { ethers } from 'ethers';
import bridgeABI from '~/app/constants/abis/bridge.json';
import soyRouterABI from '~/app/constants/abis/soyRouter.json';
import tokenABI from '~/app/constants/abis/weth.json';
import { getSoyRouterAddress } from './addressHelpers';
import { simpleRpcProvider } from './providers';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end

export function shortAddress(address: string, startChars = 8, endChars = 4): string {
  return `${address.substring(0, startChars)}.......${address.substring(address.length - endChars)}`;
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

// account is optional
export function getBridgeContract(address: string, library: Web3Provider, account?: string): Contract {
  return getContract(address, bridgeABI, library, account);
}

const getContractWithSigner = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export function getSoyRouterContract(signer?: ethers.Signer | ethers.providers.Provider): Contract {
  const address = getSoyRouterAddress();
  return getContractWithSigner(soyRouterABI, address, signer);
}

export function getSoyRouterContractByWeb3(web3?: any): Contract {
  const address = getSoyRouterAddress();
  return new web3.eth.Contract(soyRouterABI, address);
}

// account is optional
export function getTokenContract(address: string, library: Web3Provider, account?: string): Contract {
  return getContract(address, tokenABI, library, account);
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
