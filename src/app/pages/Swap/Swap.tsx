import BigNumber from 'bignumber.js';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Notice from '~/app/components/Notice';
import WalletInfo from '~/app/components/WalletInfo';
import { blockConfirmations } from '~/app/constants/config';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import useGetAllowance from '~/app/hooks/useGetAllowance';
import useGetWeb3 from '~/app/hooks/useGetWeb3';
import useSwap from '~/app/hooks/useSwap';
import {
  setConfirmedBlockCounts,
  setDestinationAddress,
  setHash,
  setStartSwapping,
  setSwapType
} from '~/app/modules/wallet/action';
import useGetWalletState from '~/app/modules/wallet/hooks';
import { getDecimalAmount } from '~/app/utils/decimal';
import getEncodedData from '~/app/utils/getEncodedData';
import { switchNetwork } from '~/app/utils/wallet';
import previousIcon from '~/assets/images/previous.svg';
import Claim from './Claim';
import './swap.css';
import SwapForm from './SwapForm';

const Swap = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [succeed, setSucced] = useState(false);
  const [canBuyCLO, setCanBuyCLO] = useState(false);
  const [txBlockNumber, setTxBlockNumber] = useState(0);
  const [switched, setSwitched] = useState(false);
  // const [confirmedCounts, setConfirmedBlockCounts] = useState(0);

  const { balance, selectedToken, fromNetwork, toNetwork } = useGetWalletState();
  const swapTokenAddr = selectedToken?.addresses[`${fromNetwork.symbol}`];
  const swapTokenAddrInCallisto = selectedToken?.addresses.CLO;

  const { onApprove, allowed } = useGetAllowance(swapTokenAddr);
  const { onAdvancedSwap, onSimpleSwap } = useSwap();
  const web3 = useGetWeb3(fromNetwork?.rpcs[0]);

  const [claimAddress, setClaimAddress] = useState('');
  const { account, chainId } = useActiveWeb3React();

  const disable = fromNetwork?.symbol === 'CLO' || toNetwork?.symbol !== 'CLO';

  const onPrevious = () => {
    navigate('/tokens');
  };

  useEffect(() => {
    dispatch(setStartSwapping(false));
  }, [dispatch]);

  useEffect(() => {
    const getCurrentBlock = () => {
      const timer = setInterval(async () => {
        const b = await web3.eth.getBlockNumber();
        if (b - txBlockNumber >= blockConfirmations[chainId]) {
          clearInterval(timer);
          setSucced(true);
          setPending(false);
          dispatch(setStartSwapping(false));
          await switchNetwork(toNetwork);
          setSwitched(true);
          setTxBlockNumber(0);
          dispatch(setConfirmedBlockCounts(0));
        } else {
          dispatch(setConfirmedBlockCounts(b - txBlockNumber));
        }
      }, 1000);
    };
    if (txBlockNumber !== 0 && pending) {
      getCurrentBlock();
    }
  }, [dispatch, txBlockNumber, pending, chainId, toNetwork, web3]);

  const onSubmit = (values: any) => {
    if (canBuyCLO) {
      advancedSwap(
        values.swap_amount,
        values.destination_wallet,
        values.buy_amount,
        values.amountsIn,
        values.amountsOut
      );
      dispatch(setSwapType('advanced-swap'));
    } else {
      onClickSwap(values.swap_amount, values.destination_wallet);
      dispatch(setSwapType('swap'));
    }
  };

  async function advancedSwap(
    amount: any,
    distinationAddress: string,
    buy_amount: any,
    amountsIn: any,
    amountsOut: any
  ) {
    setPending(true);
    const address: any = distinationAddress === '' ? account : distinationAddress;
    setClaimAddress(address);

    const bigAmount = getDecimalAmount(
      new BigNumber(amount.toString()),
      selectedToken.decimals[`${fromNetwork.symbol}`]
    );
    const buyBigAmount = getDecimalAmount(
      new BigNumber(buy_amount.toString()),
      selectedToken.decimals[`${toNetwork.symbol}`]
    );

    let value = '0';
    if (swapTokenAddr.slice(0, -2) === '0x00000000000000000000000000000000000000') {
      value = bigAmount.toString();
    } else {
      if (!allowed) {
        await onApprove();
      }
    }

    try {
      const byte_data = await getEncodedData(web3, [
        buyBigAmount,
        amountsIn,
        [swapTokenAddrInCallisto, '0xbd2D3BCe975FD72E44A73cC8e834aD1B8441BdDa'],
        distinationAddress
      ]);

      try {
        const tx = await onAdvancedSwap(address, swapTokenAddr, bigAmount, toNetwork.chainId, byte_data, value);
        if (tx.hash) {
          await handleSetPending(tx.hash, address);
        }
      } catch (error) {
        setPending(false);
        setSucced(false);
        dispatch(setStartSwapping(false));
      }
    } catch (error) {
      setPending(false);
      setSucced(false);
      dispatch(setStartSwapping(false));
    }
  }

  async function onClickSwap(amount: any, distinationAddress: string) {
    setPending(true);
    const address: any = distinationAddress === '' ? account : distinationAddress;
    setClaimAddress(address);

    const bigAmount = getDecimalAmount(
      new BigNumber(amount.toString()),
      selectedToken.decimals[`${fromNetwork.symbol}`]
    );

    if (swapTokenAddr === '') {
      toast.warning('Please select another asset. Current asset is not supported yet!');
    } else {
      let value = '0';
      if (swapTokenAddr.slice(0, -2) === '0x00000000000000000000000000000000000000') {
        value = bigAmount.toString();
      } else {
        if (!allowed) {
          await onApprove();
        }
      }

      try {
        const tx = await onSimpleSwap(address, swapTokenAddr, bigAmount, toNetwork.chainId, value);
        if (tx.hash) {
          await handleSetPending(tx.hash, address);
        }
      } catch (error) {
        setPending(false);
        setSucced(false);
        dispatch(setStartSwapping(false));
      }
    }
  }

  const handleSetPending = async (hash: string, toAddr: string) => {
    dispatch(setStartSwapping(true));
    const lastBlock = await web3.eth.getBlockNumber();
    setTxBlockNumber(lastBlock);
    dispatch(setHash(hash));
    dispatch(setDestinationAddress(toAddr));
  };

  const claim_address = useMemo(() => claimAddress, [claimAddress]);

  return (
    <>
      {pending || succeed ? (
        <Claim
          succeed={succeed}
          address={claim_address}
          totalBlockCounts={switched ? 1 : blockConfirmations[chainId]}
          web3={web3}
        />
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
