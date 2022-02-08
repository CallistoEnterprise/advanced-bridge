import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { getTokenContract } from '../utils';
import { getBridgeAddress } from '../utils/addressHelpers';
import useActiveWeb3React from './useActiveWeb3';

const useGetAllowance = (tokenAddress: string) => {
  const { account, library, chainId } = useActiveWeb3React();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const get = async () => {
      const bridgeAddr = await getBridgeAddress(chainId);
      const tkContract = await getTokenContract(tokenAddress, library, account);
      if (tkContract) {
        const allowance = await tkContract.allowance(account, bridgeAddr, { value: 0 });
        setAllowed(allowance.gt(0));
      }
    };
    if (account && tokenAddress.slice(0, -2) !== '0x00000000000000000000000000000000000000') {
      get();
    }
  }, [library, account, chainId, tokenAddress]);

  const handleApprove = useCallback(async () => {
    const bridgeAddr = await getBridgeAddress(chainId);
    const tkContract = await getTokenContract(tokenAddress, library, account);

    const tx = tkContract.approve(bridgeAddr, ethers.constants.MaxUint256, { value: 0 });
    const receipt = tx.wait();
    return receipt.status;
  }, [library, account, chainId, tokenAddress]);

  return { onApprove: handleApprove, allowed };
};

export default useGetAllowance;
