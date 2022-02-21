import { useSelector } from 'react-redux';
import { AppState } from '~/app/core/store';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3React';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();
  return useSelector((state: AppState) => state.homeBridge.blockNumber[chainId ?? -1]);
}

export default useBlockNumber;
