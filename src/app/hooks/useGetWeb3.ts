import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useGetWeb3 = (rpc: string) => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const get = async () => {
      const w = new Web3(new Web3.providers.HttpProvider(rpc));
      setWeb3(w);
    };
    get();
  }, [rpc]);
  return web3;
};

// export const useGetWeb3Provider = (rpc: string) => {
//   const [provider, setWeb3Provider] = useState(null);

//   useEffect(() => {
//     const get = async () => {
//       const w = new ethers.providers.Web3Provider(JsonRpcProvider);
//       setWeb3Provider(w);
//     };
//     get();
//   }, [rpc]);
//   return provider;
// };

export default useGetWeb3;
