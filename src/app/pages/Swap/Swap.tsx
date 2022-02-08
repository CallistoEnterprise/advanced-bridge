import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Web3 from 'web3'; // const Default = ({ children }: any) => {
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Notice from '~/app/components/Notice';
import WalletInfo from '~/app/components/WalletInfo';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import {
  setBytedata,
  setDestinationAddress,
  setHash,
  setStartSwapping,
  setSwapType
} from '~/app/modules/wallet/action';
import { getBridgeContract, getTokenContract } from '~/app/utils';
import { getBridgeAddress, getSoyRouterAddress } from '~/app/utils/addressHelpers';
import { switchNetwork } from '~/app/utils/wallet';
import previousIcon from '~/assets/images/previous.svg';
// import { useMediaQuery } from 'react-responsive';
import Claim from './Claim';
import './swap.css';
import SwapForm from './SwapForm';
//   const isNotMobile = useMediaQuery({ minWidth: 991 });
//   return isNotMobile ? children : null;
// };

const Swap = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [succeed, setSucced] = useState(false);
  const [canBuyCLO, setCanBuyCLO] = useState(false);
  const balance = useSelector((state: any) => state.wallet.balance);
  const selectedToken = useSelector((state: any) => state.wallet.selectedToken);
  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  const toNetwork = useSelector((state: any) => state.wallet.toNetwork);

  const [claimAddress, setClaimAddress] = useState('');
  const { chainId, account, library } = useActiveWeb3React();

  const disable = fromNetwork?.symbol === 'CLO' || toNetwork?.symbol !== 'CLO';

  const onPrevious = () => {
    navigate('/tokens');
  };

  useEffect(() => {
    dispatch(setStartSwapping(false));
  }, [dispatch]);

  const onSubmit = (values: any) => {
    // navigate('/claim');
    const web3 = new Web3(new Web3.providers.HttpProvider(fromNetwork.rpcs[0]));
    const amount =
      selectedToken.symbol === 'USDT' && fromNetwork.symbol === 'ETH'
        ? new BigNumber(values.swap_amount).times(new BigNumber(10).pow(6)).toString()
        : web3.utils.toWei(`${values.swap_amount}`, 'ether');
    const buy_amount =
      selectedToken.symbol === 'USDT' && fromNetwork.symbol === 'ETH'
        ? new BigNumber(values.swap_amount).times(new BigNumber(10).pow(6)).toString()
        : web3.utils.toWei(`${values.swap_amount}`, 'ether');
    // if (toNetwork.symbol === 'CLO' && values.buy_amount !== 0) {
    //   advancedSwap(amount, values.destination_wallet, buy_amount);
    //   dispatch(setSwapType('advanced-swap'));
    // } else {
    //   onClickSwap(amount, values.destination_wallet);
    //   dispatch(setSwapType('swap'));
    // }
    if (canBuyCLO) {
      advancedSwap(amount, values.destination_wallet, buy_amount);
      dispatch(setSwapType('advanced-swap'));
    } else {
      onClickSwap(amount, values.destination_wallet);
      dispatch(setSwapType('swap'));
    }
  };

  async function advancedSwap(amount: any, distinationAddress: string, buy_amount: any) {
    setPending(true);
    dispatch(setStartSwapping(true));
    const address: any = distinationAddress === '' ? account : distinationAddress;
    setClaimAddress(address);
    const bridgeAddr = getBridgeAddress(chainId);
    const swapTokenAddr = selectedToken.addresses[`${fromNetwork.symbol}`];
    const soyRouterAddr = getSoyRouterAddress();

    let value = '0';
    if (swapTokenAddr.slice(0, -2) === '0x00000000000000000000000000000000000000') {
      value = amount;
    } else {
      const tkContract = getTokenContract(swapTokenAddr, library, address);
      const allowed = await tkContract.allowance(address, soyRouterAddr, { value: 0 });
      if (parseFloat(allowed.toString()) < parseFloat(amount)) {
        await tkContract.approve(soyRouterAddr, ethers.constants.MaxUint256, { value: 0 });
      }
    }

    const today = new Date();
    const deadline = today.setHours(today.getHours() + 1);

    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(fromNetwork.rpcs[0]));
      const byte_data = await web3.eth.abi.encodeFunctionCall(
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [
            {
              type: 'uint256[]',
              name: 'amounts',
              internalType: 'uint256[]'
            }
          ],
          name: 'swapExactTokensForCLO',
          inputs: [
            {
              type: 'uint256',
              name: 'amountIn',
              internalType: 'uint256'
            },
            {
              type: 'uint256',
              name: 'amountOutMin',
              internalType: 'uint256'
            },
            {
              type: 'address[]',
              name: 'path',
              internalType: 'address[]'
            },
            {
              type: 'address',
              name: 'to',
              internalType: 'address'
            },
            {
              type: 'uint256',
              name: 'deadline',
              internalType: 'uint256'
            }
          ]
        },
        [
          amount,
          buy_amount,
          ['0xCc0524d86Ba37Cb36B21a14B118723eAF609aDd8', '0xbd2D3BCe975FD72E44A73cC8e834aD1B8441BdDa'],
          distinationAddress,
          deadline
        ]
      );

      const bridgeContract = getBridgeContract(bridgeAddr, library, address);
      try {
        const tx = await bridgeContract.bridgeToContract(
          address,
          swapTokenAddr,
          amount,
          toNetwork.chainId,
          soyRouterAddr,
          byte_data,
          { value }
        );

        const receipt = await tx.wait();
        if (receipt.status) {
          setSucced(true);
          setPending(false);
          dispatch(setStartSwapping(false));
          await switchNetwork(toNetwork);
          dispatch(setBytedata(byte_data));
          dispatch(setHash(tx.hash));
          dispatch(setDestinationAddress(address));
        } else {
          setPending(false);
        }
      } catch (error) {
        console.log('error===>', error);
        setPending(false);
      }
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }

  async function onClickSwap(amount: any, distinationAddress: string) {
    setPending(true);
    dispatch(setStartSwapping(true));
    const address: any = distinationAddress === '' ? account : distinationAddress;
    setClaimAddress(address);
    const swapTokenAddr = selectedToken.addresses[`${fromNetwork.symbol}`];
    if (swapTokenAddr === '') {
      toast.warning('Please select another asset. Current asset is not supported yet!');
    } else {
      const bridgeAddr = await getBridgeAddress(chainId);
      let value = '0';
      if (swapTokenAddr.slice(0, -2) === '0x00000000000000000000000000000000000000') {
        value = amount;
      } else {
        const tkContract = await getTokenContract(swapTokenAddr, library, address);
        const allowed = await tkContract.allowance(address, bridgeAddr);
        if (parseFloat(allowed.toString()) < parseFloat(amount)) {
          await tkContract.approve(bridgeAddr, ethers.constants.MaxUint256, { value: 0 });
        }
      }
      const bridgeContract = getBridgeContract(bridgeAddr, library, address);

      try {
        const tx = await bridgeContract.depositTokens(address, swapTokenAddr, amount, toNetwork.chainId, { value });
        const receipt = await tx.wait();
        if (receipt.status) {
          setSucced(true);
          setPending(false);
          dispatch(setStartSwapping(false));
          await switchNetwork(toNetwork);
          dispatch(setHash(tx.hash));
          dispatch(setDestinationAddress(address));
        } else {
          setPending(false);
          setSucced(false);
          dispatch(setStartSwapping(false));
        }
      } catch (error) {
        console.log(error);
        setPending(false);
        setSucced(false);
        dispatch(setStartSwapping(false));
      }
    }
  }

  const claim_address = useMemo(() => claimAddress, [claimAddress]);

  return (
    <>
      {pending || succeed ? (
        <Claim succeed={succeed} address={claim_address} />
      ) : (
        <div className="swap container">
          <div className="swap__content">
            <CustomButton className="previous_btn" onClick={onPrevious}>
              <div>
                <img src={previousIcon} alt="previousIcon" className="me-2" />
                {t('Previous')}
              </div>
            </CustomButton>
            {/* <Default>
          <GuidePet />
        </Default> */}
            <div className="swap__content--mainboard">
              <WalletInfo />
              <div className="swap__content__steps">
                <BorderContainer className="swap__content__bordercontainer">
                  <div>
                    <p className="swap__content--row">
                      <strong>{t('Step 4:')}</strong> {t('Swap')}
                    </p>
                    <SwapForm
                      submit={onSubmit}
                      pending={pending}
                      disable={disable}
                      canBuyCLO={canBuyCLO}
                      initialData={{ swap_amount: '0', buy_amount: '0', destination_wallet: account }}
                      setBuyCLO={() => setCanBuyCLO(!canBuyCLO)}
                    />
                  </div>
                </BorderContainer>
              </div>
            </div>
            {parseInt(balance.clo) === 0 && <Notice />}
          </div>
        </div>
      )}
    </>
  );
};

export default Swap;
