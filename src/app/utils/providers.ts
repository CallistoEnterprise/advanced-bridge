import { ethers } from 'ethers';
import getRpcUrl from '~/app/utils/getRpcUrl';

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export default null;
