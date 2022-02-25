import classNames from 'classnames';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3React';
import arrowDown from '~/assets/images/arrowdown.svg';
import blockIcon from '~/assets/images/block.png';
import discord from '~/assets/images/discord.svg';
import facebook from '~/assets/images/facebook.svg';
import medium from '~/assets/images/medium.svg';
import telegram from '~/assets/images/telegram.svg';
import twitter from '~/assets/images/twitter.svg';
import whiteLogo from '~/assets/images/white-logo.svg';
import { blockConfirmations } from '../constants/config';
import './footer.css';

const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

export default function Footer() {
  const { chainId } = useActiveWeb3React();
  const [t] = useTranslation();
  const [documentList, setDocumentList] = useState(false);
  const [resourceslist, setResourcesList] = useState(false);

  // const [number, setNumber] = useState(0);

  const { start_swapping, confirmedBlockCounts } = useSelector((state: any) => state.walletBridge);

  // useEffect(() => {
  //   let interval: any;
  //   if (start_swapping && number < 12) {
  //     interval = setInterval(() => setNumber(number + 1), 1000);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [number, start_swapping]);

  const dispBNumber =
    !start_swapping && confirmedBlockCounts !== 0 ? blockConfirmations[chainId] : confirmedBlockCounts;

  return (
    <div className={classNames('footer', { footer__animation: start_swapping })}>
      {start_swapping && (
        <div className="footer__blockContent">
          <img src={blockIcon} alt="blockIcon" className="footer__blockIcon" />
          <p className="footer__blockNumber">block {dispBNumber}</p>
        </div>
      )}
      <Container>
        <div className="footer__content">
          <div>
            <img src={whiteLogo} alt="whitelogo" />
            <Default>
              <>
                <p className="footer__link">{t('All rights reserved by')}</p>
                <p className="footer__bold">{t('Callisto Enterprise')}</p>
              </>
            </Default>
          </div>
          <div className="footer__content--center">
            <div className="footer__center">
              <div className="footer__center__dropdown">
                <p className="footer__bold">{t('Ressources')}</p>
                <Mobile>
                  <img
                    src={arrowDown}
                    alt="arrowDown"
                    onClick={() => {
                      setResourcesList(!resourceslist);
                      setDocumentList(false);
                    }}
                  />
                </Mobile>
              </div>
              <div className={classNames({ footer__center__linklist: !resourceslist })}>
                <p className="footer__link">{t('Team')}</p>
                <p className="footer__link">{t('Github')}</p>
                <p className="footer__link">{t('Callisto Network')}</p>
                <p className="footer__link">{t('Callisto Enterprise')}</p>
              </div>
            </div>
            <div className="footer__center">
              <div className="footer__center__dropdown">
                <p className="footer__bold">{t('Documentation')}</p>
                <Mobile>
                  <img
                    src={arrowDown}
                    alt="arrowDown"
                    onClick={() => {
                      setDocumentList(!documentList);
                      setResourcesList(false);
                    }}
                  />
                </Mobile>
              </div>
              <div className={classNames({ footer__center__linklist: !documentList })}>
                <p className="footer__link">{t('Platform Audit Report')}</p>
                <p className="footer__link">{t('Bug Bounty Report')}</p>
                <p className="footer__link">{t('Monetary Policy')}</p>
                <p className="footer__link">{t('ERC 223 Token Standard')}</p>
              </div>
            </div>
          </div>
          <div className="footer__socialmedia u-align-center">
            <p className="footer__bold">{t('Social Media')}</p>
            <div className="mt-3">
              <img src={telegram} alt="telegram" />
              <img src={twitter} alt="twitter" />
              <img src={discord} alt="discord" />
              <img src={facebook} alt="facebook" />
              <img src={medium} alt="medium" />
            </div>
          </div>
          <Mobile>
            <p className="footer__privacy">
              All rights reserved by <strong>Callisto Enterprise</strong>{' '}
            </p>
          </Mobile>
        </div>
      </Container>
    </div>
  );
}
