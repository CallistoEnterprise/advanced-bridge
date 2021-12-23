import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import GuidePet from '~/app/components/common/GuidePet';
import NetworkSelection from '~/app/components/NetworkSelection';
import bnbIcon from '~/assets/images/bnb.svg';
import cloIcon from '~/assets/images/clo.svg';
import copyIcon from '~/assets/images/copy.svg';
import etcIcon from '~/assets/images/etc.svg';
import ethIcon from '~/assets/images/eth.svg';
import metamaskIcon from '~/assets/images/metamask.svg';
import previousIcon from '~/assets/images/previous.svg';
import './network.css';

interface tokenType {
  icon: string;
  name: string;
  balance: string;
}

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

const dumyData: Array<tokenType> = [
  {
    icon: cloIcon,
    name: 'CLO',
    balance: '320.000'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    balance: '320.000'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    balance: '320.000'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    balance: '320.000'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    balance: '320.000'
  }
];

const TokenItem = (item: tokenType, index: number) => {
  return (
    <li className="tokenitem" key={index}>
      <div className="d-flex">
        <img className="me-2" src={item.icon} alt="icon" />
        <p>{item.balance}</p>
      </div>
      <p>{item.name}</p>
    </li>
  );
};

export default function Network() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [networkOne, setNetworkOne] = useState(null);
  const [networkTwo, setNetworkTwo] = useState(null);

  const onChangeNetworkOne = (option: network) => {
    setNetworkOne(option.value);
  };

  const onChangeNetworkTwo = (option: network) => {
    setNetworkTwo(option.value);
  };

  const onPrevious = () => {
    navigate('/');
  };

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
        <BorderContainer className="network__content__balance">
          <div>
            <img src={metamaskIcon} alt="metamaskIcon" />
            <div className="d-flex">
              <p className="me-1">0x2Ac321c20w...A211</p>
              <img src={copyIcon} alt="copyIcon" />
            </div>
            <p className="network__content__balance--title">{t('Balance')}</p>
            <ul>
              {dumyData.map((item, index) => {
                return TokenItem(item, index);
              })}
            </ul>
            <hr className="solid mt-5"></hr>
            <p className="network__content__balance--disconnect">{t('Disconnect')}</p>
          </div>
        </BorderContainer>
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
