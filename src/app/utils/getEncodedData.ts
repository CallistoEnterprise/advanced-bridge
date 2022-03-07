import BigNumber from 'bignumber.js';

const method = {
  type: 'function',
  stateMutability: 'nonpayable',
  outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
  name: 'swapTokensForExactCLO',
  inputs: [
    { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
    { type: 'uint256', name: 'amountInMax', internalType: 'uint256' },
    { type: 'address[]', name: 'path', internalType: 'address[]' },
    { type: 'address', name: 'to', internalType: 'address' },
    { type: 'uint256', name: 'deadline', internalType: 'uint256' }
  ]
};

const getEncodedData = async (web3: any, params: [BigNumber, BigNumber, [string, string], string]) => {
  const today = new Date();
  const deadline = today.setHours(today.getHours() + 1);
  const funParams = [...params, deadline];
  const data = await web3.eth.abi.encodeFunctionCall(method, funParams);
  return data;
};

export default getEncodedData;
