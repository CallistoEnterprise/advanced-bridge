import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomButton from '~/app/components/common/CustomButton';
import blockIcon from '~/assets/images/block3.png';
import claimAnimal from '~/assets/images/claimanimal.png';
import './claim.css';

export default function Claim() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const onClaim = () => {
    navigate('/transfer');
  };

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
            {t('Claim')}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
