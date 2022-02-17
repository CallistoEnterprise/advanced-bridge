import { useSelector } from 'react-redux';

const useSwapState = () => {
  return useSelector((state: any) => state.swap);
};

export default useSwapState;
