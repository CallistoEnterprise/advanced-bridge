import React from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import discord from '~/assets/images/discord.svg';
import facebook from '~/assets/images/facebook.svg';
import medium from '~/assets/images/medium.svg';
import telegram from '~/assets/images/telegram.svg';
import twitter from '~/assets/images/twitter.svg';
import whiteLogo from '~/assets/images/white-logo.svg';
import './footer.css';

export default function Footer() {
  const [t] = useTranslation();
  return (
    <div className="footer">
      <Container>
        <div className="footer__content">
          <div>
            <img src={whiteLogo} alt="whitelogo" />
            <p className="footer__link">{t('All rights reserved by')}</p>
            <p className="footer__bold">{t('Callisto Enterprise')}</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="footer__center">
              <p className="footer__bold">{t('Ressources')}</p>
              <p className="footer__link">{t('Team')}</p>
              <p className="footer__link">{t('Github')}</p>
              <p className="footer__link">{t('Callisto Network')}</p>
              <p className="footer__link">{t('Callisto Enterprise')}</p>
            </div>
            <div className="footer__center">
              <p className="footer__bold">{t('Documentation')}</p>
              <p className="footer__link">{t('Platform Audit Report')}</p>
              <p className="footer__link">{t('Bug Bounty Report')}</p>
              <p className="footer__link">{t('Monetary Policy')}</p>
              <p className="footer__link">{t('ERC 223 Token Standard')}</p>
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
        </div>
      </Container>
    </div>
  );
}
