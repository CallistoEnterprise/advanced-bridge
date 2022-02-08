import { useSelector } from 'react-redux';

const useGetWalletState = () => {
  return useSelector((state: any) => state.wallet);
};

export default useGetWalletState;
