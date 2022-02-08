import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { changeCurrentLanguage, getCurrentLanguage, Language } from '~/app/app.i18n';
import CustomButton from '~/app/components/common/CustomButton';
import logo from '~/assets/images/logo.svg';
import './header.css';

export default function Header() {
  const [t] = useTranslation();

  const onChangeLanguage = (lng: string) => {
    switch (lng) {
      case 'en':
        changeCurrentLanguage(Language.English);
        break;
      case 'ch':
        changeCurrentLanguage(Language.Chinese);
        break;
      default:
        changeCurrentLanguage(Language.English);
    }
  };

  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="header__right justify-content-end">
        <p> {t('SOY Bridge Security Model')}</p>
        <CustomButton>{t('Launch SOY Finance')}</CustomButton>
        <NavDropdown
          className="header__dropdownToggle"
          title={getCurrentLanguage()}
          as={ButtonGroup}
          id="navbarScrollingDropdown"
        >
          <NavDropdown.Item onClick={() => onChangeLanguage('en')}>EN</NavDropdown.Item>
          <NavDropdown.Item onClick={() => onChangeLanguage('ch')}>CH</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
