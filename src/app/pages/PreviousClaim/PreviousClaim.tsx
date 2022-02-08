import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Spinner from '~/app/components/common/Spinner';
import NetworkSelection from '~/app/components/NetworkSelection';
import WalletInfo from '~/app/components/WalletInfo';
import { INetwork } from '~/app/constants/interface';
import { Networks, walletTokens } from '~/app/constants/strings';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import { useNativeCoinBalance } from '~/app/hooks/wallet';
import { setBalance, setFromNetwork } from '~/app/modules/wallet/action';
import { getBridgeContract, shortAddress } from '~/app/utils';
import getSignatures from '~/app/utils/getSignatures';
import { switchNetwork } from '~/app/utils/wallet';
import previousIcon from '~/assets/images/previous.svg';
import './previousclaim.css';

export default function PreviousClaim() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pending, setPending] = useState<boolean>(false);

  const [hash, setHash] = useState<string>('');

  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  const destinationAddress = useSelector((state: any) => state.wallet.destinationAddress);
  const { library } = useActiveWeb3React();

  const [pendingBalance, setPendingBalance] = useState(false);
  const [networkOne, setNetworkOne] = useState(Networks[0]);
  const { chainId } = useActiveWeb3React();

  const cloBalance = useNativeCoinBalance(networkOne, walletTokens[0]);
  const bnbBalance = useNativeCoinBalance(networkOne, walletTokens[1]);

  useEffect(() => {
    setPendingBalance(true);
    if (bnbBalance && bnbBalance !== null && cloBalance && cloBalance !== null) {
      const bnbValidBalance = parseInt(networkOne.chainId) === chainId ? bnbBalance : '0.00';
      const cloValidBalance = parseInt(networkOne.chainId) === chainId ? cloBalance : '0.00';
      dispatch(setBalance({ bnb: bnbValidBalance, clo: cloValidBalance }));
      if (parseInt(networkOne.chainId) === chainId) setPendingBalance(false);
    }
  }, [bnbBalance, cloBalance, networkOne, chainId, dispatch]);

  const onPrevious = () => {
    navigate('/');
  };

  const onPreviousClaim = () => {
    handleClaim();
  };

  const onChangeNetworkOne = async (option: INetwork) => {
    setNetworkOne(option);
    dispatch(setFromNetwork(option));
  };

  async function handleClaim() {
    if (hash) {
      setPending(true);
    }

    try {
      const { signatures, respJSON } = await getSignatures(hash, fromNetwork.chainId);

      if (respJSON.chainId !== chainId.toString()) {
        const toNetwork = Networks.find((item) => item.chainId === respJSON.chainId);
        try {
          toast.info('Please change your network to claim this transaction');
          await switchNetwork(toNetwork);
        } catch (error) {
          toast.warning('Please check your network connection and try again.');
        }
      } else {
        if (signatures.length === 0) {
          setPending(false);
          toast.warning('Please check your network connection and try again.');
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
          setHash('');
          navigate('/transfer');
          toast.success('Claimed successfully.');
        } else {
          setPending(false);
          toast.error('Failed to claim. Please try again1.');
        }
        setPending(false);
      }
    } catch (err) {
      toast.error('Failed to claim. Please try again2.');
      setPending(false);
    }
  }

  return (
    <div className="previousclaim container">
      <div className="previousclaim__content">
        <div>
          <WalletInfo pending={pendingBalance} />
          <CustomButton className="previous_btn mt-4" onClick={onPrevious}>
            <div>
              <img src={previousIcon} alt="previousIcon" className="me-2" />
              Previous
            </div>
          </CustomButton>
        </div>
        <div className="previousclaim__content__steps">
          <h5>Claim a previous transaction </h5>
          <p className="mt-5">{t('Select networks')}</p>
          <h6 className="mt-4">{t('From')}</h6>
          <NetworkSelection options={Networks} selected={networkOne.symbol} onChange={onChangeNetworkOne} />
        </div>
        <BorderContainer className="previousclaim__claiminfo">
          <p>Previous Transaction Hash</p>
          <input
            className="previousclaim__claiminfo__hashInput"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Previous transaction hash"
            autoFocus
          />
          <p className="mt-5">Destination wallet</p>
          <h6>{shortAddress(destinationAddress, 21, 7)}</h6>
          <hr />
          <button
            color="success"
            disabled={hash === ''}
            className="previousclaim__claiminfo__button"
            onClick={onPreviousClaim}
          >
            {pending ? (
              <div>
                <Spinner className="me-2" size="sm" />
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
