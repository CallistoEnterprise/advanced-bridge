import { parseUnits } from '@ethersproject/units';
import { Currency, CurrencyAmount, JSBI, Token, TokenAmount, Trade } from '@soy-libs/sdk2';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '~/app/core/store';
import useENS from '~/app/hooks/ENS/useENS';
import { useCurrency } from '~/app/hooks/Tokens';
import { useTradeExactIn, useTradeExactOut } from '~/app/hooks/Trades';
import { useCurrencyBalances } from '~/app/modules/wallet/hooks';
import { isAddress } from '~/app/utils';
import { computeSlippageAdjustedAmounts } from '~/app/utils/prices';
import { FieldInput, typeInput } from './action';

const useGetSwapState = () => {
  return useSelector((state: AppState) => state.swapBridge);
};

export function useSwapActionHandlers(): {
  onUserInput: (field: FieldInput, typedValue: string) => void;
} {
  const dispatch = useDispatch<AppDispatch>();

  const onUserInput = useCallback(
    (field: FieldInput, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }));
    },
    [dispatch]
  );

  return { onUserInput };
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}

const BAD_RECIPIENT_ADDRESSES: string[] = [
  '0x3e9587795073b41e99a08477fA9b40D3AAeFD28A', // factory
  '0x2d00585c6dF45DfD537d9c2b722EbF99572E9AE2' // router
];

/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade: Trade, checksummedAddress: string): boolean {
  return (
    trade.route.path.some((token) => token.address === checksummedAddress) ||
    trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress)
  );
}

export function useDerivedSwapInfo(): {
  currencies: { [field in FieldInput]?: Currency };
  currencyBalances: { [field in FieldInput]?: CurrencyAmount };
  parsedAmount: CurrencyAmount | undefined;
  v2Trade: Trade | undefined;
  inputError?: string;
} {
  const { account } = useWeb3React();
  const {
    independentField,
    typedValue,
    [FieldInput.INPUT]: { currencyId: inputCurrencyId },
    [FieldInput.OUTPUT]: { currencyId: outputCurrencyId },
    recipient
  } = useGetSwapState();

  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);
  const recipientLookup = useENS(recipient ?? undefined);
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null;

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined
  ]);

  const isExactIn: boolean = independentField === FieldInput.INPUT;
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined);

  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined);
  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined);

  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;

  const currencyBalances = {
    [FieldInput.INPUT]: relevantTokenBalances[0],
    [FieldInput.OUTPUT]: relevantTokenBalances[1]
  };

  const currencies: { [field in FieldInput]?: Currency } = {
    [FieldInput.INPUT]: inputCurrency ?? undefined,
    [FieldInput.OUTPUT]: outputCurrency ?? undefined
  };

  let inputError: string | undefined;
  if (!account) {
    inputError = 'Connect Wallet';
  }

  if (!parsedAmount) {
    inputError = inputError ?? 'Enter an amount';
  }

  if (!currencies[FieldInput.INPUT] || !currencies[FieldInput.OUTPUT]) {
    inputError = inputError ?? 'Select a token';
  }

  const formattedTo = isAddress(to);
  if (!to || !formattedTo) {
    inputError = inputError ?? 'Enter a recipient';
  } else if (
    BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
    (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
    (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
  ) {
    inputError = inputError ?? 'Invalid recipient';
  }

  const allowedSlippage = 50; // useUserSlippageTolerance();

  const slippageAdjustedAmounts =
    v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage);

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [
    currencyBalances[FieldInput.INPUT],
    slippageAdjustedAmounts ? slippageAdjustedAmounts[FieldInput.INPUT] : null
  ];

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = `Insufficient ${amountIn.currency.symbol} balance`;
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    v2Trade: v2Trade ?? undefined,
    inputError
  };
}

export default useGetSwapState;
