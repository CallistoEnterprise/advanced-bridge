import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import CustomButton from '~/app/components/common/CustomButton';
import GuidePet from '~/app/components/common/GuidePet';
import TokenSelection from '~/app/components/TokenSelection';
import WalletInfo from '~/app/components/WalletInfo';
import previousIcon from '~/assets/images/previous.svg';
import bakeIcon from '~/assets/images/tokens/bake.png';
import bnbIcon from '~/assets/images/tokens/bnb.png';
import cakeIcon from '~/assets/images/tokens/cake.png';
import cloIcon from '~/assets/images/tokens/clo.png';
import etcIcon from '~/assets/images/tokens/etc.png';
import ethIcon from '~/assets/images/tokens/eth.png';
import linaIcon from '~/assets/images/tokens/lina.png';
import racaIcon from '~/assets/images/tokens/raca.png';
import reffIcon from '~/assets/images/tokens/reff.png';
import shibIcon from '~/assets/images/tokens/shib.png';
import twtIcon from '~/assets/images/tokens/twt.png';
import usdtIcon from '~/assets/images/tokens/usdt.png';
import wsgIcon from '~/assets/images/tokens/wsg.png';
import './tokenlist.css';

interface network {
  icon: string;
  name: string;
  value: string;
}

const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png
const options = [
  {
    icon: cloIcon,
    name: 'CLO',
    value: 'clo'
  },
  {
    icon: bnbIcon,
    name: 'BNB',
    value: 'bnb'
  },
  {
    icon: ethIcon,
    name: 'ETH',
    value: 'eth'
  },
  {
    icon: etcIcon,
    name: 'ETC',
    value: 'etc'
  },
  {
    icon: usdtIcon,
    name: 'USDT',
    value: 'usdt'
  },
  {
    icon: cakeIcon,
    name: 'CAKE',
    value: 'cake'
  },
  {
    icon: twtIcon,
    name: 'TWT',
    value: 'twt'
  },
  {
    icon: wsgIcon,
    name: 'WSG',
    value: 'wsg'
  },
  {
    icon: reffIcon,
    name: 'REFF',
    value: 'reff'
  },
  {
    icon: bakeIcon,
    name: 'BAKE',
    value: 'bake'
  },
  {
    icon: shibIcon,
    name: 'SHIB',
    value: 'shib'
  },
  {
    icon: racaIcon,
    name: 'RACA',
    value: 'raca'
  },
  {
    icon: linaIcon,
    name: 'LINA',
    value: 'lina'
  }
];

export default function TokenList() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [value, setValue] = useState('');

  const onChangeToken = (option: network) => {
    setToken(option.value);
  };

  const onPrevious = () => {
    navigate('/network');
  };

  const onNext = () => {
    if (token !== null) {
      navigate('/swap');
    }
  };

  return (
    <div className="tokenlist container">
      <div className="tokenlist__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            {t('Previous')}
          </div>
        </CustomButton>
        <Default>
          <GuidePet />
        </Default>
        <WalletInfo />
        <div className="tokenlist__content__steps">
          <p>
            <strong>{t('Step 3:')}</strong> {t('Select the token to swap')}
          </p>
          <input
            className="form-control tokenlist__content__filter"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            placeholder="Search token"
          />
          <TokenSelection
            options={options.filter((item) => {
              if (!value) return true;
              if (
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.name.toLowerCase().includes(value.toLowerCase())
              ) {
                return true;
              }
              return false;
            })}
            onChange={onChangeToken}
          />
          <CustomButton className="mt-5" onClick={onNext}>
            {t('Next')}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
