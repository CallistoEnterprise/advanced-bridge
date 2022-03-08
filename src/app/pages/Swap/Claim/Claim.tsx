import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from '~/app/components/common/CustomButton';
import Spinner from '~/app/components/common/Spinner';
// import useActiveWeb3React from '~/app/hooks/useActiveWeb3React';
import useClaim from '~/app/hooks/useClaim';
import useGetWalletState from '~/app/modules/wallet/hooks';
import getSignatures from '~/app/utils/getSignatures';
import claimAnimal from '~/assets/images/animal.gif';
import './claim.css';

type props = {
  succeed: boolean;
  address?: string;
  confirmedCounts?: number;
  totalBlockCounts?: number;
  web3?: any;
};

export default function Claim({ succeed, totalBlockCounts }: props) {
  // const { chainId } = useActiveWeb3React();
  const [t] = useTranslation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [pending, setPending] = useState(false);
  // const [txBlockNumber, setTxBlockNumber] = useState(0);

  const { hash, fromNetwork, swapType } = useGetWalletState();
  const { onSimpleClaim, onAdvancedClaim } = useClaim();

  // useEffect(() => {
  //   const getCurrentBlock = () => {
  //     const timer = setInterval(async () => {
  //       const b = await web3.eth.getBlockNumber();
  //       if (b - txBlockNumber >= blockConfirmations[chainId]) {
  //         clearInterval(timer);
  //         setPending(false);
  //         dispatch(setStartSwapping(false));
  //         setTxBlockNumber(0);
  //         dispatch(setConfirmedBlockCounts(0));
  //         window.localStorage.removeItem('prevData');
  //         setPending(false);
  //         navigate('/transfer');
  //         toast.success('Claimed successfully.');
  //       } else {
  //         dispatch(setConfirmedBlockCounts(b - txBlockNumber));
  //       }
  //     }, 1000);
  //   };
  //   if (txBlockNumber !== 0 && pending) {
  //     getCurrentBlock();
  //   }
  // }, [dispatch, navigate, txBlockNumber, pending, chainId, web3]);

  const onClaim = () => {
    if (hash === '') {
      return;
    }
    if (swapType === 'swap') handleClaim();
    else if (swapType === 'advanced-swap') handleAdvancedClaim();
  };

  async function handleAdvancedClaim() {
    setPending(true);
    try {
      const { signatures, respJSON } = await getSignatures(hash, fromNetwork.chainId);

      if (signatures.length !== 3) {
        setPending(false);
        toast.warning('Failed Signature');
        return;
      }
      try {
        const receipt = await onAdvancedClaim(respJSON, hash, fromNetwork.chainId, signatures);
        if (receipt.status) {
          // await handleSetPending();
          setPending(false);
          window.localStorage.removeItem('prevData');
          setPending(false);
          navigate('/transfer');
          toast.success('Claimed successfully.');
        }
      } catch (error) {
        setPending(false);
        toast.error('Failed to claim. Please try again.');
      }
    } catch (err) {
      setPending(false);
      toast.error('Failed to get signature. Please try again.');
    }
  }

  async function handleClaim() {
    setPending(true);

    try {
      const { signatures, respJSON } = await getSignatures(hash, fromNetwork.chainId);
      if (signatures.length === 0) {
        setPending(false);
        toast.warning('Invalid signature.');
        return;
      }
      const receipt = await onSimpleClaim(respJSON, hash, fromNetwork.chainId, signatures);
      if (receipt.status) {
        // await handleSetPending();
        setPending(false);
        window.localStorage.removeItem('prevData');
        setPending(false);
        navigate('/transfer');
        toast.success('Claimed successfully.');
      }
    } catch (err) {
      toast.error('Failed to get signature. Please try again.');
      setPending(false);
    }
  }

  // const handleSetPending = async () => {
  //   dispatch(setStartSwapping(true));
  //   const lastBlock = await web3.eth.getBlockNumber();
  //   setTxBlockNumber(lastBlock);
  // };

  return (
    <div className="claim container">
      <div className="claim__content">
        <div className="claim__content--blockbox">
          <img src={claimAnimal} className="claim__content__animal" alt="claimAnimal" />
        </div>
        <div className="claim__content--text">
          <h4>{t('Transfert in progress')}</h4>
          <p>
            {t(
              `Please wait for ${totalBlockCounts} ${
                totalBlockCounts === 1 ? 'block confirmation' : 'blocks confirmations'
              } to claim your transaction.`
            )}
          </p>
          {succeed && (
            <CustomButton className="claim__claimbtn" disabled={pending} onClick={onClaim}>
              {pending ? (
                <div>
                  <Spinner className="me-2" size="sm" />
                  Wait...
                </div>
              ) : (
                t('Claim')
              )}
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}
