import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import useGetWalletState from '../modules/wallet/hooks';
import { getSoyRouterContractByWeb3 } from '../utils';
import { getDecimalAmount } from '../utils/decimal';
import { useWeb3Provider } from './wallet';

const BIG_ZERO = new BigNumber(0);

export const useGetAmountsOut = (amount: string) => {
  const [amountsOut, setAmountsOut] = useState(BIG_ZERO);
  const rpc = process.env.REACT_APP_NODE_1;
  const provider = useWeb3Provider(rpc);
  const { selectedToken } = useGetWalletState();

  useEffect(() => {
    const fetch = async () => {
      const contract = await getSoyRouterContractByWeb3(provider);
      const bigAmount = getDecimalAmount(new BigNumber(amount));
      const swapTokenAddrInCallisto = selectedToken?.addresses.CLO;
      const path = [swapTokenAddrInCallisto, '0xbd2D3BCe975FD72E44A73cC8e834aD1B8441BdDa'];
      const outAmt = await contract.methods.getAmountsOut(bigAmount.toString(), path).call();
      setAmountsOut(outAmt[1]);
    };
    if (!Number.isNaN(parseFloat(amount))) {
      fetch();
    } else {
      setAmountsOut(BIG_ZERO);
    }
  }, [amount, provider, selectedToken]);

  return amountsOut;
};

export const useGetAmountsInput = (amount: string) => {
  const [amountsOut, setAmountsOut] = useState(BIG_ZERO);
  const rpc = process.env.REACT_APP_NODE_1;
  const provider = useWeb3Provider(rpc);
  const { selectedToken } = useGetWalletState();

  useEffect(() => {
    const fetch = async () => {
      const contract = await getSoyRouterContractByWeb3(provider);
      const bigAmount = getDecimalAmount(new BigNumber(amount));
      const swapTokenAddrInCallisto = selectedToken?.addresses.CLO;
      const path = [swapTokenAddrInCallisto, '0xbd2D3BCe975FD72E44A73cC8e834aD1B8441BdDa'];
      const outAmt = await contract.methods.getAmountsIn(bigAmount.toString(), path).call();
      setAmountsOut(outAmt[0]);
    };
    if (!Number.isNaN(parseFloat(amount))) {
      fetch();
    } else {
      setAmountsOut(BIG_ZERO);
    }
  }, [amount, provider, selectedToken]);

  return amountsOut;
};
