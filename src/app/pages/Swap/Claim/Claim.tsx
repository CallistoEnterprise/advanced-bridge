import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from '~/app/components/common/CustomButton';
import Spinner from '~/app/components/common/Spinner';
import useClaim from '~/app/hooks/useClaim';
import useGetWalletState from '~/app/modules/wallet/hooks';
import getSignatures from '~/app/utils/getSignatures';
import claimAnimal from '~/assets/images/animal.gif';
import './claim.css';

type props = {
  succeed: boolean;
  address?: string;
};

export default function Claim({ succeed }: props) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const { hash, fromNetwork, swapType } = useGetWalletState();
  const { onSimpleClaim, onAdvancedClaim } = useClaim();

  const onClaim = () => {
    if (swapType === 'swap') handleClaim();
    else if (swapType === 'advanced-swap') handleAdvancedClaim();
  };

  async function handleAdvancedClaim() {
    if (hash) {
      setPending(true);
    }
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
          setPending(false);
          navigate('/transfer');
          toast.success('Claimed successfully.');
        } else {
          setPending(false);
          toast.error('Failed to claim. Please try again.');
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
    if (hash) {
      setPending(true);
    }

    try {
      const { signatures, respJSON } = await getSignatures(hash, fromNetwork.chainId);
      if (signatures.length === 0) {
        setPending(false);
        toast.warning('Invalid signature.');
        return;
      }
      const receipt = await onSimpleClaim(respJSON, hash, fromNetwork.chainId, signatures);
      if (receipt.status) {
        window.localStorage.removeItem('prevData');
        setPending(false);
        navigate('/transfer');
        toast.success('Claimed successfully.');
      } else {
        setPending(false);
        toast.error('Failed to claim. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to get signature. Please try again.');
      setPending(false);
    }
  }

  return (
    <div className="claim container">
      <div className="claim__content">
        <div className="claim__content--blockbox">
          <img src={claimAnimal} className="claim__content__animal" alt="claimAnimal" />
        </div>
        <div className="claim__content--text">
          <h4>{t('Transfert in progress')}</h4>
          <p>{t('Please wait for 12 blocks confirmations to claim your transaction.')}</p>
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
