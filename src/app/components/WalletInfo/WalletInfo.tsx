import React from 'react';
import { useTranslation } from 'react-i18next';
import BorderContainer from '~/app/components/common/BorderContainer';
import cloIcon from '~/assets/images/clo.svg';
import copyIcon from '~/assets/images/copy.svg';
import metamaskIcon from '~/assets/images/metamask.svg';
import './walletinfo.css';

interface tokenType {
  icon: string;
  name: string;
  balance: string;
}

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

export default function WalletInfo() {
  const [t] = useTranslation();
  return (
    <BorderContainer className="walletinfo__balance">
      <div>
        <img src={metamaskIcon} alt="metamaskIcon" />
        <div className="d-flex">
          <p className="me-1">0x2Ac321c20w...A211</p>
          <img src={copyIcon} alt="copyIcon" />
        </div>
        <p className="walletinfo__balance--title">{t('Balance')}</p>
        <ul>
          {dumyData.map((item, index) => {
            return TokenItem(item, index);
          })}
        </ul>
        <hr className="solid mt-5"></hr>
        <p className="walletinfo__balance--disconnect">{t('Disconnect')}</p>
      </div>
    </BorderContainer>
  );
}
