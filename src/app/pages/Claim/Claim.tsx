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
import claimAnimal from '~/assets/images/animal.gif';
import './claim.css';

export default function Claim() {
  const [t] = useTranslation();
  const { address } = useParams();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const txHash = useSelector((state: any) => state.wallet.hash);
  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);
  const swapType = useSelector((state: any) => state.wallet.swapType);
  const { library } = useActiveWeb3React();

  const onClaim = () => {
    if (swapType === 'swap') handleClaim();
    else if (swapType === 'advanced-swap') handleAdvancedClaim();
  };

  async function handleAdvancedClaim() {
    // console.log(txHash);
    if (txHash) {
      setPending(true);
    }

    try {
      const { signatures, respJSON } = await getSignatures(txHash, fromNetwork.chainId);
      if (signatures.length === 0) {
        setPending(false);
        toast.warning('Please check your network connection and try again.');
        return;
      }
      const bridgeContract = await getBridgeContract(respJSON.bridge, library, address);
      // console.log(
      //   'token=>',
      //   respJSON.token,
      //   'txId=>',
      //   txHash,
      //   'to=>',
      //   respJSON.to,
      //   'value=>',
      //   respJSON.value,
      //   'chainId=>',
      //   fromNetwork.chainId,
      //   'toContract=>',
      //   respJSON.toContract,
      //   'data=>',
      //   respJSON.data,
      //   'signature=>',
      //   signatures,
      //   'value=>',
      //   0
      // );

      const tx = await bridgeContract.claimToContract(
        respJSON.token,
        txHash,
        respJSON.to,
        respJSON.value,
        fromNetwork.chainId,
        respJSON.toContract,
        respJSON.data,
        signatures,
        { value: 0 }
      );

      try {
        const receipt = await tx.wait();
        if (receipt.status) {
          window.localStorage.removeItem('prevData');
          setPending(false);
          navigate('/transfer');
          toast.success('Claimed successfully.');
        } else {
          setPending(false);
          toast.error('Failed to claim. Please try again.1');
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      setPending(false);
    }
  }

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
          {/* <img src={blockIcon} className="claim__content__block" alt="blockIcon" /> */}
        </div>
        <div className="claim__content--text">
          <h4>{t('Transfert in progress')}</h4>
          <p>{t('Please wait for 12 blocks confirmations to claim your transaction.')}</p>
          <CustomButton className="claim__claimbtn" onClick={onClaim}>
            {pending ? (
              <div>
                <Spinner className="me-2" size="sm" />
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
