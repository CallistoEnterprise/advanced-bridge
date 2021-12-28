import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BorderContainer from '~/app/components/common/BorderContainer';
import CustomButton from '~/app/components/common/CustomButton';
import NetworkSelection from '~/app/components/NetworkSelection';
import WalletInfo from '~/app/components/WalletInfo';
import bnbIcon from '~/assets/images/bnb.svg';
import cloIcon from '~/assets/images/clo.svg';
import etcIcon from '~/assets/images/etc.svg';
import ethIcon from '~/assets/images/eth.svg';
import previousIcon from '~/assets/images/previous.svg';
import './previousclaim.css';

interface network {
  icon: string;
  name: string;
  value: string;
}
// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png
const options = [
  {
    icon: ethIcon,
    name: 'ETH',
    value: 'eth'
  },
  {
    icon: bnbIcon,
    name: 'BNB',
    value: 'bnb'
  },
  {
    icon: etcIcon,
    name: 'ETC',
    value: 'etc'
  },
  {
    icon: cloIcon,
    name: 'CLO',
    value: 'clo'
  }
];

export default function PreviousClaim() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [networkOne, setNetworkOne] = useState(null);
  const [networkTwo, setNetworkTwo] = useState(null);
  const [networkThree, setNetworkThree] = useState(null);

  useEffect(() => {
    if (networkOne !== null && networkTwo !== null && networkThree !== null) {
      navigate('/transfer');
    }
  }, [navigate, networkOne, networkTwo, networkThree]);

  const onChangeNetworkOne = (option: network) => {
    setNetworkOne(option.value);
  };

  const onChangeNetworkTwo = (option: network) => {
    setNetworkTwo(option.value);
  };
  const onChangeNetworkThree = (option: network) => {
    setNetworkThree(option.value);
  };

  const onPrevious = () => {
    navigate('/');
  };

  const onPreviousClaim = () => {
    navigate('/transfer');
  };

  return (
    <div className="previousclaim container">
      <div className="previousclaim__content">
        <div>
          <WalletInfo />
          <CustomButton className="previous_btn mt-4" onClick={onPrevious}>
            <div>
              <img src={previousIcon} alt="previousIcon" className="me-2" />
              Previous
            </div>
          </CustomButton>
        </div>
        <div className="previousclaim__content__steps">
          <h5>Claim a previous transaction </h5>
          <p className="mt-5">{t('Select the transfered asset')}</p>
          <NetworkSelection options={options} onChange={onChangeNetworkOne} />

          <p className="mt-5">{t('Select networks')}</p>
          <h6 className="mt-4">{t('From')}</h6>
          <NetworkSelection options={options} onChange={onChangeNetworkTwo} />
          <h6 className="mt-4">{t('To')}</h6>
          <NetworkSelection options={options} onChange={onChangeNetworkThree} />
        </div>
        <BorderContainer className="previousclaim__claiminfo">
          <p>Previous Transaction Hash</p>
          <h6>0x2Ac3Sa2xxc@121c20w.......wd2A211</h6>
          <hr />
          <p className="mt-5">Destination wallet</p>
          <h6>0x2Ac3Sa2xxc@121c20w.......wd2A211</h6>
          <hr />
          <button color="success" className="previousclaim__claiminfo__button" onClick={onPreviousClaim}>
            {t('CLAM')}
          </button>
        </BorderContainer>
      </div>
    </div>
  );
}
