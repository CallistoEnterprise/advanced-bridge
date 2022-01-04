import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import ClaimPet from '~/app/components/common/ClaimPet';
import CustomButton from '~/app/components/common/CustomButton';
import TokenSelection from '~/app/components/TokenSelection';
import bnbIcon from '~/assets/images/bnb.svg';
import cloIcon from '~/assets/images/clo.svg';
import etcIcon from '~/assets/images/etc.svg';
import ethIcon from '~/assets/images/eth.svg';
import previousIcon from '~/assets/images/previous.svg';
import './transfer.css';

interface network {
  icon: string;
  name: string;
  value: string;
}
// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png
const options = [
  {
    icon: ethIcon,
    name: 'ccCLO in Ethereum',
    value: 'eth'
  },
  {
    icon: bnbIcon,
    name: 'ccCLO in BSC',
    value: 'bnb'
  },
  {
    icon: etcIcon,
    name: 'ccCLO in ETC',
    value: 'etc'
  },
  {
    icon: cloIcon,
    name: 'ccBNB in Callisto',
    value: 'clo'
  },
  {
    icon: etcIcon,
    name: 'ccETH in Callisto',
    value: 'etc'
  },
  {
    icon: etcIcon,
    name: 'ccETC in Callisto',
    value: 'etc'
  },
  {
    icon: etcIcon,
    name: 'BUSDT in Callisto',
    value: 'etc'
  }
];

const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export default function Transfer() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  // const [networkOne, setNetworkOne] = useState(null);

  const onChangeNetworkOne = (option: network) => {
    console.log(option.value);
    // setNetworkOne(option.value);
  };

  const onPrevious = () => {
    navigate('/');
  };

  return (
    <div className="transfer container">
      <div className="transfer__content">
        <CustomButton className="previous_btn" onClick={onPrevious}>
          <div>
            <img src={previousIcon} alt="previousIcon" className="me-2" />
            {t('Previous')}
          </div>
        </CustomButton>
        <Default>
          <ClaimPet />
        </Default>

        <div className="transfer__content__steps">
          <h4>{t('Transfert complete!')}</h4>
          <h6 className="mt-5">{t('You don’t see your tokens?')}</h6>
          <h6 className="mt-3">{t('Just add your asset to your wallet by clicking on its icon!')}</h6>
          <TokenSelection options={options} onChange={onChangeNetworkOne} className="transfer__selection" />
        </div>
        <Mobile>
          <div className="transfer__mobile">
            <p>Lagging transaction?</p>
            <p>Stay zen and click here!</p>
            <button type="submit" color="success" className="transfer__mobile__submit">
              {t('SWAP')}
              {/* {isPending(state) ? 'Wait...' : 'Submit'} */}
            </button>
          </div>
        </Mobile>
      </div>
    </div>
  );
}
