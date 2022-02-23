import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import CustomButton from '~/app/components/common/CustomButton';
import GuidePet from '~/app/components/common/GuidePet';
import TokenSelection from '~/app/components/TokenSelection';
import WalletInfo from '~/app/components/WalletInfo';
import { IToken } from '~/app/constants/interface';
import { tokenList } from '~/app/constants/strings';
import { setSelectedToken } from '~/app/modules/wallet/action';
import previousIcon from '~/assets/images/previous.svg';
import './tokenlist.css';

const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

export default function TokenList() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { selectedToken } = useGetWalletState();
  const [token, setToken] = useState(null);
  const [value, setValue] = useState('');
  // const swapTokenAddr = selectedToken?.addresses?.CLO;

  // useEffect(() => {
  //   dispatch(
  //     selectCurrency({
  //       field: FieldInput.INPUT,
  //       currencyId: swapTokenAddr
  //     })
  //   );
  // }, [swapTokenAddr, dispatch]);

  const onChangeToken = (option: IToken) => {
    setToken(option.symbol);
    dispatch(setSelectedToken(option));
  };

  const onPrevious = () => {
    navigate('/network');
  };

  const onNext = () => {
    if (token !== null) {
      navigate('/swap');
    }
  };

  return (
    <div className="tokenlist container">
      <div className="tokenlist__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            {t('Previous')}
          </div>
        </CustomButton>
        <Default>
          <GuidePet />
        </Default>
        <WalletInfo />
        <div className="tokenlist__content__steps">
          <p>
            <strong>{t('Step 3:')}</strong> {t('Select the token to swap')}
          </p>
          <input
            className="form-control tokenlist__content__filter"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            placeholder="Search token"
          />
          <TokenSelection
            options={tokenList.filter((item) => {
              if (!value) return true;
              if (
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.name.toLowerCase().includes(value.toLowerCase())
              ) {
                return true;
              }
              return false;
            })}
            onChange={onChangeToken}
          />
          <CustomButton className="mt-5" onClick={onNext} disabled={token === null}>
            {t('Next')}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
