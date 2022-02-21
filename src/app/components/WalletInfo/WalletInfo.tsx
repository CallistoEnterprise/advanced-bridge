import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import Spinner from '~/app/components/common/Spinner';
import { walletTokens } from '~/app/constants/strings';
import useAuth from '~/app/hooks/useAuth';
import copyIcon from '~/assets/images/copy.svg';
import metamaskIcon from '~/assets/images/metamask.svg';
import './walletinfo.css';

interface tokenType {
  icon: string;
  name: string;
  balance: string;
}

const TokenItem = (item: tokenType, index: number, balance: any) => {
  return (
    <li className="tokenitem" key={index}>
      <div className="d-flex align-items-center">
        <img className="me-2" src={item.icon} alt="icon" />
        <p className="ms-2">{balance && balance[item.name.toLowerCase()]}</p>
      </div>
      <p>{item.name}</p>
    </li>
  );
};

type walletInfoProps = {
  pending?: boolean;
};

export default function WalletInfo({ pending }: walletInfoProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { account, active } = useWeb3React();

  const { logout } = useAuth();
  const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 4)}` : null;

  const balance = useSelector((state: any) => state.walletBridge.balance);
  useEffect(() => {
    if (!active) {
      navigate('/');
    }
  }, [active, navigate]);

  const onClickDisconnect = () => {
    logout();
    navigate('/');
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
            {pending ? (
              <Spinner className="mt-5" size="sm" />
            ) : (
              <ul>
                {walletTokens.map((item, index) => {
                  return TokenItem(item, index, balance);
                })}
              </ul>
            )}

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
