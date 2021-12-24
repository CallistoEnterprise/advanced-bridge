import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomButton from '~/app/components/common/CustomButton';
import GuidePet from '~/app/components/common/GuidePet';
import TokenSelection from '~/app/components/TokenSelection';
import WalletInfo from '~/app/components/WalletInfo';
import bnbIcon from '~/assets/images/bnb.svg';
import cloIcon from '~/assets/images/clo.svg';
import etcIcon from '~/assets/images/etc.svg';
import ethIcon from '~/assets/images/eth.svg';
import previousIcon from '~/assets/images/previous.svg';
import './tokenlist.css';

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
  },
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
  },
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
  },
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
  },
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
  },
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

export default function TokenList() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token !== null) {
      navigate('/tokens');
    }
  }, [token]);

  const onChangeToken = (option: network) => {
    setToken(option.value);
  };

  const onPrevious = () => {
    navigate('/network');
  };

  return (
    <div className="tokenlist container">
      <div className="tokenlist__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            Previous
          </div>
        </CustomButton>
        <GuidePet />
        <WalletInfo />
        <div className="tokenlist__content__steps">
          <p>
            <strong>{t('Step 3:')}</strong> {t('Select the token to swap')}
          </p>
          <TokenSelection options={options} onChange={onChangeToken} />
        </div>
      </div>
    </div>
  );
}
