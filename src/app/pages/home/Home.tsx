import { ConnectorNames } from '@soy-libs/uikit';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import { Networks } from '~/app/constants/strings';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import useAuth from '~/app/hooks/useAuth';
import { setFromNetwork } from '~/app/modules/wallet/action';
import { setupEthereumNetwork, setupNetwork } from '~/app/utils/wallet';
import animal from '~/assets/images/animal.png';
import helpIcon from '~/assets/images/help.svg';
import metamaskIcon from '~/assets/images/metamask.svg';
import moreWallet from '~/assets/images/more-wallet.svg';
import trustIcon from '~/assets/images/trust.svg';
import walletConnect from '~/assets/images/wallet-connect.svg';
import './home.css';

export default function Home() {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState<string>('');

  const { account } = useActiveWeb3React();
  const { login } = useAuth();

  useEffect(() => {
    if (account) {
      navigate(`/${page}`);
    }
  }, [account, navigate, page]);

  const onClaim = () => {
    // navigate('/network');
  };
  console.log('====');
  const onPreviousClaim = async () => {
    setPage('previousclaim');
    login(isMobile ? ConnectorNames.WalletConnect : ConnectorNames.Injected, Networks[0]);
    const network = Networks[0];
    dispatch(setFromNetwork(network));
    if (network.symbol === 'ETH') {
      await setupEthereumNetwork(network);
    } else {
      await setupNetwork(network);
    }
  };

  const onClickMetamask = async (connectorId: ConnectorNames) => {
    setPage('network');

    login(connectorId, Networks[0]);
    const network = Networks[0];
    dispatch(setFromNetwork(network));
    if (network.symbol === 'ETH') {
      await setupEthereumNetwork(network);
    } else {
      await setupNetwork(network);
    }
  };

  return (
    <div className="home container">
      <p className="home__title">{t('Soy Finance Bridge')}</p>
      <BorderContainer className="home__content bordercontainer--noborder">
        <div className="home__wallets">
          <p className="home__wallets__title">{t('Select your wallet')}</p>
          <div className="home__help">
            <img src={helpIcon} alt="helpIcon" />
            <p>Help</p>
          </div>
          <div className="mt-5">
            <BorderContainer className="home__wallets__block" onClick={() => onClickMetamask(ConnectorNames.Injected)}>
              <div>
                <img src={metamaskIcon} alt="metamaskIcon" />
                <p className="home__wallets__block--more">Metamask</p>
              </div>
            </BorderContainer>
            <BorderContainer
              className="home__wallets__block"
              onClick={() => onClickMetamask(ConnectorNames.WalletConnect)}
            >
              <div>
                <img src={walletConnect} alt="walletConnect" />
                <p className="home__wallets__block--more">wallet connect</p>
              </div>
            </BorderContainer>
          </div>
          <div className="mt-4">
            <BorderContainer className="home__wallets__block" onClick={onClaim}>
              <div>
                <img src={trustIcon} alt="trustIcon" />
                <p className="home__wallets__block--more">trust wallet</p>
              </div>
            </BorderContainer>
            <BorderContainer className="home__wallets__block" onClick={onClaim}>
              <div>
                <img src={moreWallet} alt="moreWallet" />
                <p className="home__wallets__block--more">more</p>
              </div>
            </BorderContainer>
          </div>
          <div className="mt-4 home__claimbtnbox">
            <CustomButton className="home__claimbtn" onClick={onPreviousClaim}>
              {t('Claim a  Previous Transaction')}
            </CustomButton>
          </div>
        </div>
        <div className="home__animal home__animal@m">
          <img src={animal} alt="animal" />
        </div>
      </BorderContainer>
    </div>
  );
}
