import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import useAuth from '~/app/hooks/useAuth';
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

const TokenItem = (item: tokenType, fromNetwork: any, index: number) => {
  // const { chainId } = useActiveWeb3React();
  // const currAsset = tokenList.find((o: any) => o.name === item.name);
  // let balances: any, validBalance: any;
  // if (currAsset) {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   balances = useNativeCoinBalance(fromNetwork, currAsset);
  //   validBalance = parseInt(fromNetwork.chainId) === chainId ? balances : '0.00';
  // }

  // const validBalance = parseInt(fromNetwork.chainId) === chainId ? balances : '0.00';
  return (
    <li className="tokenitem" key={index}>
      <div className="d-flex align-items-center">
        <img className="me-2" src={item.icon} alt="icon" />
        <p className="ms-2">{'0.00'}</p>
      </div>
      <p>{item.name}</p>
    </li>
  );
};

export default function WalletInfo() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { account, active } = useWeb3React();

  const { logout } = useAuth();
  const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 4)}` : null;

  const fromNetwork = useSelector((state: any) => state.wallet.fromNetwork);

  useEffect(() => {
    if (!active) {
      navigate('/');
    }
  }, [active, navigate]);

  const onClickDisconnect = () => {
    logout();
  };

  return (
    <>
      {!isMobile ? (
        <BorderContainer className="walletinfo__balance">
          <div>
            <img src={metamaskIcon} alt="metamaskIcon" />
            <div className="d-flex">
              <p className="me-1">{accountEllipsis}</p>
              <img src={copyIcon} alt="copyIcon" />
            </div>
            <p className="walletinfo__balance--title">{t('Balance')}</p>
            <ul>
              {dumyData.map((item, index) => {
                return TokenItem(item, fromNetwork, index);
              })}
            </ul>
            <hr className="solid mt-5"></hr>
            <p className="walletinfo__balance--disconnect" onClick={onClickDisconnect}>
              {t('Disconnect')}
            </p>
          </div>
        </BorderContainer>
      ) : (
        <div className="walletinfo__balance d-flex align-items-center justify-content-center">
          <div>
            <img src={metamaskIcon} alt="metamaskIcon" />
          </div>
          <div className="ms-4">
            <div className="d-flex">
              <p className="me-1">{accountEllipsis}</p>
              <img src={copyIcon} alt="copyIcon" />
            </div>
            <hr className="solid"></hr>
            <p className="walletinfo__balance--disconnect" onClick={onClickDisconnect}>
              {t('Disconnect')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
