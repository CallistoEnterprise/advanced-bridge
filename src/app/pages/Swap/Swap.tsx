import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Notice from '~/app/components/Notice';
import WalletInfo from '~/app/components/WalletInfo';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import { setHash } from '~/app/modules/wallet/action';
import { getBridgeContract, getTokenContract } from '~/app/utils';
import { getBridgeAddress } from '~/app/utils/decimal';
import { switchNetwork } from '~/app/utils/wallet';
import previousIcon from '~/assets/images/previous.svg';
import './swap.css';
import SwapForm from './SwapForm';

// const Default = ({ children }: any) => {
//   const isNotMobile = useMediaQuery({ minWidth: 991 });
//   return isNotMobile ? children : null;
// };

const Swap = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const balance = useSelector((state: any) => state.wallet.balance);
  const selectedToken = useSelector((state: any) => state.wallet.selectedToken);
  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  const toNetwork = useSelector((state: any) => state.wallet.toNetwork);
  const { chainId, account, library } = useActiveWeb3React();

  const onPrevious = () => {
    navigate('/tokens');
  };

  const onSubmit = (values: any) => {
    console.log(values);
    // navigate('/claim');
    handleSwapFirst(values.swap_amount);
  };

  async function handleSwapFirst(amount: string) {
    const swapTokenAddr = selectedToken.addresses[`${fromNetwork.symbol}`];
    if (swapTokenAddr === '') {
      console.log('Warning', 'Please select another asset. Current asset is not supported yet!');
    } else {
      const bridgeAddr = getBridgeAddress(chainId);
      let value = '0';
      if (swapTokenAddr.slice(0, -2) === '0x00000000000000000000000000000000000000') {
        value = amount;
      } else {
        const tkContract = getTokenContract(swapTokenAddr, library, account);
        const allowed = await tkContract.allowance(account, bridgeAddr, { value: 0 });
        if (parseFloat(allowed.toString()) < parseFloat(amount)) {
          await tkContract.approve(bridgeAddr, ethers.constants.MaxUint256, { value: 0 });
        }
      }
      const bridgeContract = getBridgeContract(bridgeAddr, library, account);
      const tx = await bridgeContract.depositTokens(swapTokenAddr, parseFloat(amount), toNetwork.chainId, { value });
      setPending(true);

      const receipt = await tx.wait();
      if (receipt.status) {
        console.log('Success!!!!');
        await switchNetwork(toNetwork);
        setPending(false);
        dispatch(setHash(tx.hash));
        // window.localStorage.setItem('prevData', tx.hash);
        // setTxHash(tx.hash);
        // setStep(2);
        // setRcvAddress(account);
        navigate('/claim');
      } else {
        setPending(false);
      }
    }
  }

  return (
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
                <SwapForm submit={onSubmit} pending={pending} />
              </div>
            </BorderContainer>
          </div>
        </div>
        {parseInt(balance.clo) === 0 && <Notice />}
      </div>
    </div>
  );
};

export default Swap;
