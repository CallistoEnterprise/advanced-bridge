import { useSelector } from 'react-redux';
import { AppState } from '~/app/core/store';
// import useActiveWeb3React from '~/app/hooks/useActiveWeb3React';

export function useBlockNumber(): number | undefined {
  // const { chainId } = useActiveWeb3React();
  return useSelector((state: AppState) => state.homeBridge.blockNumber[20729]);
}

export default useBlockNumber;
