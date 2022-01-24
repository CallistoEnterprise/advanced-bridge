import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Spinner from '~/app/components/common/Spinner';
import WalletInfo from '~/app/components/WalletInfo';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import { getBridgeContract, shortAddress } from '~/app/utils';
import getSignatures from '~/app/utils/getSignatures';
import previousIcon from '~/assets/images/previous.svg';
import './previousclaim.css';

// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png

export default function PreviousClaim() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [pending, setPending] = useState(false);

  const selectedToken = useSelector((state: any) => state.wallet.selectedToken);
  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  const toNetwork = useSelector((state: any) => state.wallet.toNetwork);
  const hash = useSelector((state: any) => state.wallet.hash);
  const destinationAddress = useSelector((state: any) => state.wallet.destinationAddress);
  const { library } = useActiveWeb3React();
  // const [networkOne, setNetworkOne] = useState(null);
  // const [networkTwo, setNetworkTwo] = useState(null);
  // const [networkThree, setNetworkThree] = useState(null);

  // useEffect(() => {
  //   if (networkOne !== null && networkTwo !== null && networkThree !== null) {
  //     navigate('/transfer');
  //   }
  // }, [navigate, networkOne, networkTwo, networkThree]);

  // const onChangeNetworkOne = (option: network) => {
  //   setNetworkOne(option.symbol);
  // };

  // const onChangeNetworkTwo = (option: network) => {
  //   setNetworkTwo(option.symbol);
  // };
  // const onChangeNetworkThree = (option: network) => {
  //   setNetworkThree(option.symbol);
  // };

  const onPrevious = () => {
    navigate('/');
  };

  const onPreviousClaim = () => {
    handleClaim();
  };

  async function handleClaim() {
    if (hash) {
      setPending(true);
    }

    try {
      const { signatures, respJSON } = await getSignatures(hash, fromNetwork.chainId);
      if (signatures.length !== 3) {
        setPending(false);
        console.log('Warning', 'Please check your network connection and try again.');
        return;
      }
      const bridgeContract = await getBridgeContract(respJSON.bridge, library, destinationAddress);
      const tx = await bridgeContract.claim(
        respJSON.token,
        hash,
        respJSON.to,
        respJSON.value,
        fromNetwork.chainId,
        signatures,
        { value: 0 }
      );
      const receipt = await tx.wait();
      if (receipt.status) {
        window.localStorage.removeItem('prevData');
        setPending(false);
        // setStep(0);
        // setAmt('');
        // setTxHash('');
        navigate('/transfer');
        console.log('Success!', 'Claimed successfully.');
      } else {
        setPending(false);
        console.log('Error!', 'Failed to claim. Please try again.');
      }
    } catch (err) {
      console.log('Error!', 'Failed to claim. Please try again.');
      setPending(false);
    }
  }

  return (
    <div className="previousclaim container">
      <div className="previousclaim__content">
        <div>
          <WalletInfo />
          <CustomButton className="previous_btn mt-4" onClick={onPrevious}>
            <div>
              <img src={previousIcon} alt="previousIcon" className="me-2" />
              Previous
            </div>
          </CustomButton>
        </div>
        <div className="previousclaim__content__steps">
          <h5>Claim a previous transaction </h5>
          <p className="mt-5">{t('Select the transfered asset')}</p>
          {/* <NetworkSelection options={Networks} onChange={onChangeNetworkOne} /> */}
          <button
            className={classNames('previousclaim-option', {
              'previousclaim-selected': true
            })}
          >
            <div>
              <img src={selectedToken.icon} alt="icon" />
              {selectedToken.name}
            </div>
          </button>
          <p className="mt-5">{t('Select networks')}</p>
          <h6 className="mt-4">{t('From')}</h6>
          <button
            className={classNames('previousclaim-option', {
              'previousclaim-selected': true
            })}
          >
            <div>
              <img src={fromNetwork.img} alt="icon" />
              {fromNetwork.symbol}
            </div>
          </button>
          <h6 className="mt-4">{t('To')}</h6>
          <button
            className={classNames('previousclaim-option', {
              'previousclaim-selected': true
            })}
          >
            <div>
              <img src={toNetwork.img} alt="icon" />
              {toNetwork.symbol}
            </div>
          </button>
        </div>
        <BorderContainer className="previousclaim__claiminfo">
          <p>Previous Transaction Hash</p>
          <h6>{shortAddress(hash, 21, 7)}</h6>
          <hr />
          <p className="mt-5">Destination wallet</p>
          <h6>{shortAddress(destinationAddress, 21, 7)}</h6>
          <hr />
          <button color="success" className="previousclaim__claiminfo__button" onClick={onPreviousClaim}>
            {pending ? (
              <div>
                <Spinner className="me-2" />
                Wait...
              </div>
            ) : (
              t('Claim')
            )}
          </button>
        </BorderContainer>
      </div>
    </div>
  );
}
