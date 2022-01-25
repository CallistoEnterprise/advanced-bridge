import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from '~/app/components/common/CustomButton';
import Spinner from '~/app/components/common/Spinner';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import { getBridgeContract } from '~/app/utils';
import getSignatures from '~/app/utils/getSignatures';
import blockIcon from '~/assets/images/block3.png';
import claimAnimal from '~/assets/images/claimanimal.png';
import './claim.css';

export default function Claim() {
  const [t] = useTranslation();
  const { address } = useParams();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const txHash = useSelector((state: any) => state.wallet.hash);
  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  // const toNetwork = useSelector((state: any) => state.wallet.toNetwork);
  const { library } = useActiveWeb3React();

  // useEffect(() => {
  //   if (txHash) {
  //     handleClaim();
  //   }
  // }, [txHash]);

  const onClaim = () => {
    handleClaim();
  };

  async function handleClaim() {
    if (txHash) {
      setPending(true);
    }

    try {
      const { signatures, respJSON } = await getSignatures(txHash, fromNetwork.chainId);
      if (signatures.length !== 3) {
        setPending(false);
        toast.warning('Please check your network connection and try again.');
        return;
      }
      const bridgeContract = await getBridgeContract(respJSON.bridge, library, address);
      const tx = await bridgeContract.claim(
        respJSON.token,
        txHash,
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
        toast.success('Claimed successfully.');
      } else {
        setPending(false);
        toast.error('Failed to claim. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to claim. Please try again.');
      setPending(false);
    }
  }

  return (
    <div className="claim container">
      <div className="claim__content">
        <div className="claim__content--blockbox">
          <img src={claimAnimal} className="claim__content__animal" alt="claimAnimal" />
          <img src={blockIcon} className="claim__content__block" alt="blockIcon" />
        </div>
        <div className="claim__content--text">
          <h4>{t('Transfert in progress')}</h4>
          <p>{t('Please wait for 12 blocks confirmations to claim your transaction.')}</p>
          <CustomButton className="claim__claimbtn" onClick={onClaim}>
            {pending ? (
              <div>
                <Spinner className="me-2" />
                Wait...
              </div>
            ) : (
              t('Claim')
            )}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
