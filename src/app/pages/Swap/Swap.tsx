import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import Notice from '~/app/components/Notice';
import WalletInfo from '~/app/components/WalletInfo';
import previousIcon from '~/assets/images/previous.svg';
import './swap.css';
import SwapForm from './SwapForm';

// const Default = ({ children }: any) => {
//   const isNotMobile = useMediaQuery({ minWidth: 991 });
//   return isNotMobile ? children : null;
// };

const Swap = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const onPrevious = () => {
    navigate('/tokens');
  };

  const onSubmit = () => {
    navigate('/claim');
  };

  return (
    <div className="swap container">
      <div className="swap__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            {t('Previous')}
          </div>
        </CustomButton>
        {/* <Default>
          <GuidePet />
        </Default> */}
        <div className="swap__content--mainboard">
          <WalletInfo />
          <div className="swap__content__steps">
            <BorderContainer className="swap__content__bordercontainer">
              <div>
                <p className="swap__content--row">
                  <strong>{t('Step 4:')}</strong> {t('Swap')}
                </p>
                <SwapForm submit={onSubmit} />
              </div>
            </BorderContainer>
          </div>
        </div>
        <Notice />
      </div>
    </div>
  );
};

export default Swap;
