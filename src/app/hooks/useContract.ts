// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts';
import { ChainId } from '@soy-libs/sdk2';
import { useMemo } from 'react';
import ENS_PUBLIC_RESOLVER_ABI from '~/app/constants/abis/ens-public-resolver.json';
import ENS_ABI from '~/app/constants/abis/ens-registrar.json';
import { ERC20_BYTES32_ABI } from '~/app/constants/abis/erc20';
import ERC20_ABI from '~/app/constants/abis/erc20.json';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '~/app/constants/multicall';
import { getContract } from '../utils';
import useActiveWeb3React from './useActiveWeb3React';

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React();
  let address: string | undefined;
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.CLOTESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
        break;
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();

  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false);
}
