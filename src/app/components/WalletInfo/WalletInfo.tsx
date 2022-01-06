import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import BorderContainer from '~/app/components/common/BorderContainer';
import cloIcon from '~/assets/images/clo.svg';
import copyIcon from '~/assets/images/copy.svg';
import metamaskIcon from '~/assets/images/metamask.svg';
import busdtIcon from '~/assets/images/tokens/busdt.svg';
import ccETHIcon from '~/assets/images/tokens/ccETH.svg';
import cloeIcon from '~/assets/images/tokens/cloe.svg';
import soyIcon from '~/assets/images/tokens/soy.svg';
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
    balance: '0.000'
  },
  {
    icon: busdtIcon,
    name: 'BUSDT',
    balance: '0.000'
  },
  {
    icon: cloeIcon,
    name: 'CLOE',
    balance: '0.000'
  },
  {
    icon: ccETHIcon,
    name: 'ETH',
    balance: '0.000'
  },
  {
    icon: soyIcon,
    name: 'SOY',
    balance: '0.000'
  }
];

const TokenItem = (item: tokenType, index: number) => {
  return (
    <li className="tokenitem" key={index}>
      <div className="d-flex align-items-center">
        <img className="me-2" src={item.icon} alt="icon" />
        <p className="ms-2">{item.balance}</p>
      </div>
      <p>{item.name}</p>
    </li>
  );
};

export default function WalletInfo() {
  const [t] = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      {!isMobile ? (
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
      ) : (
        <div className="walletinfo__balance d-flex align-items-center justify-content-center">
          <div>
            <img src={metamaskIcon} alt="metamaskIcon" />
          </div>
          <div className="ms-4">
            <div className="d-flex">
              <p className="me-1">0x2Ac321c20w...A211</p>
              <img src={copyIcon} alt="copyIcon" />
            </div>
            <hr className="solid"></hr>
            <p className="walletinfo__balance--disconnect">{t('Disconnect')}</p>
          </div>
        </div>
      )}
    </>
  );
}
