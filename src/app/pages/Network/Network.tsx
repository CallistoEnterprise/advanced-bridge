import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomButton from '~/app/components/common/CustomButton';
import GuidePet from '~/app/components/common/GuidePet';
import NetworkSelection from '~/app/components/NetworkSelection';
import WalletInfo from '~/app/components/WalletInfo';
import bnbIcon from '~/assets/images/bnb.svg';
import cloIcon from '~/assets/images/clo.svg';
import etcIcon from '~/assets/images/etc.svg';
import ethIcon from '~/assets/images/eth.svg';
import previousIcon from '~/assets/images/previous.svg';
import './network.css';

interface network {
  icon: string;
  name: string;
  value: string;
}
// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png
const options = [
  {
    icon: ethIcon,
    name: 'ETH',
    value: 'eth'
  },
  {
    icon: bnbIcon,
    name: 'BNB',
    value: 'bnb'
  },
  {
    icon: etcIcon,
    name: 'ETC',
    value: 'etc'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    value: 'clo'
  }
];

export default function Network() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [networkOne, setNetworkOne] = useState(null);
  const [networkTwo, setNetworkTwo] = useState(null);

  useEffect(() => {
    if (networkOne !== null && networkTwo !== null) {
      navigate('/tokens');
    }
  }, [networkOne, networkTwo]);

  const onChangeNetworkOne = (option: network) => {
    setNetworkOne(option.value);
  };

  const onChangeNetworkTwo = (option: network) => {
    setNetworkTwo(option.value);
  };

  const onPrevious = () => {
    navigate('/');
  };

  console.log(networkOne, networkTwo);

  return (
    <div className="network container">
      <div className="network__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            Previous
          </div>
        </CustomButton>
        <GuidePet />
        <WalletInfo />
        <div className="network__content__steps">
          <p>
            <strong>{t('Step 1:')}</strong> {t('Select the origin network')}
          </p>
          <h6>{t('The network from which you want to send your assets.')}</h6>
          <NetworkSelection options={options} onChange={onChangeNetworkOne} />

          <p className="mt-5">
            <strong>{t('Step 2:')}</strong> {t('Select the destination network')}
          </p>
          <h6>{t('The network to which you want to send your assets.')}</h6>
          <NetworkSelection options={options} onChange={onChangeNetworkTwo} />
        </div>
      </div>
    </div>
  );
}
