/* eslint-disable no-param-reassign */
import { parseBytes32String } from '@ethersproject/strings';
import { Currency, ETHER, Token } from '@soy-libs/sdk2';
import { useWeb3React } from '@web3-react/core';
import { arrayify } from 'ethers/lib/utils';
import { useMemo } from 'react';
import {
  TokenAddressMap,
  useCombinedActiveList,
  useCombinedInactiveList,
  useDefaultTokenList,
  useUnsupportedTokenList
} from '../modules/lists/hooks';
import { NEVER_RELOAD, useSingleCallResult } from '../modules/multicall/hooks';
import { isAddress } from '../utils';
import { filterTokens } from '../utils/filtering';
import { useBytes32TokenContract, useTokenContract } from './useContract';

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap): { [address: string]: Token } {
  const { chainId } = useWeb3React();

  return useMemo(() => {
    if (!chainId) return {};

    // reduce to just tokens
    // const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
    //   newMap[address] = tokenMap[chainId][address].token;
    //   return newMap;
    // }, {});

    return tokenMap;
  }, [chainId, tokenMap]);
}

export function useDefaultTokens(): { [address: string]: Token } {
  const defaultList = useDefaultTokenList();
  return useTokensFromMap(defaultList);
}

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList();
  return useTokensFromMap(allTokens);
}

export function useAllInactiveTokens(): { [address: string]: Token } {
  // get inactive tokens
  const inactiveTokensMap = useCombinedInactiveList();
  const inactiveTokens = useTokensFromMap(inactiveTokensMap);

  // filter out any token that are on active list
  const activeTokensAddresses = Object.keys(useAllTokens());
  const filteredInactive = activeTokensAddresses
    ? Object.keys(inactiveTokens).reduce<{ [address: string]: Token }>((newMap, address) => {
        if (!activeTokensAddresses.includes(address)) {
          newMap[address] = inactiveTokens[address];
        }
        return newMap;
      }, {})
    : inactiveTokens;

  return filteredInactive;
}

export function useUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList();
  return useTokensFromMap(unsupportedTokensMap);
}

export function useIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = useAllTokens();

  if (!activeTokens || !token) {
    return false;
  }

  return !!activeTokens[token.address];
}

// used to detect extra search results
export function useFoundOnInactiveList(searchQuery: string): Token[] | undefined {
  const { chainId } = useWeb3React();
  const inactiveTokens = useAllInactiveTokens();

  return useMemo(() => {
    if (!chainId || searchQuery === '') {
      return undefined;
    }
    const tokens = filterTokens(Object.values(inactiveTokens), searchQuery);
    return tokens;
  }, [chainId, inactiveTokens, searchQuery]);
}

// // Check if currency is included in custom list from user storage
// export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
//   return false;
// }

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue;
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useWeb3React();
  const tokens = useAllTokens();

  const address = isAddress(tokenAddress);

  const tokenContract = useTokenContract(address || undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false);
  const token: Token | undefined = address ? tokens[address] : undefined;

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  );
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
  const symbolBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'symbol',
    undefined,
    NEVER_RELOAD
  );
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);

  return useMemo(() => {
    if (token) return token;
    if (!chainId || !address) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      );
    }
    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result
  ]);
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isCLO = currencyId?.toUpperCase() === 'CLO';
  const token = useToken(isCLO ? undefined : currencyId);
  return isCLO ? ETHER : token;
}
