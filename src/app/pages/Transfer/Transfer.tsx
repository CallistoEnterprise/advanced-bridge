import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from '~/app/components/common/CustomButton';
import TokenSelection from '~/app/components/TokenSelection';
import useActiveWeb3React from '~/app/hooks/useActiveWeb3';
import { registerToken } from '~/app/utils/wallet';
import previousIcon from '~/assets/images/previous.svg';
import ccBNBIcon from '~/assets/images/tokens/ccBNB.svg';
import ccBUSDTIcon from '~/assets/images/tokens/ccBUSDT.svg';
import ccCLOIcon from '~/assets/images/tokens/ccCLO.svg';
import ccETCIcon from '~/assets/images/tokens/ccETC.svg';
import ccETHIcon from '~/assets/images/tokens/ccETH.svg';
import './transfer.css';

// https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png
const options = [
  {
    icon: ccCLOIcon,
    name: 'ccCLO in Ethereum',
    value: 'eth',
    symbol: 'ccCLO',
    chainId: 1,
    address: '0xCcbf1C9E8b4f2cDF3Bfba1098b8f56f97d219D53',
    network: 'Ethereum'
  },
  {
    icon: ccCLOIcon,
    name: 'ccCLO in BSC',
    value: 'bnb',
    symbol: 'ccCLO',
    chainId: 97,
    address: '0xCCEA50dDA26F141Fcc41Ad7e94755936d8C57e28',
    network: 'BSC'
  },
  {
    icon: ccCLOIcon,
    name: 'ccCLO in ETC',
    value: 'etc',
    symbol: 'ccCLO',
    chainId: 61,
    address: '0xCcbf1C9E8b4f2cDF3Bfba1098b8f56f97d219D53',
    network: 'ETC'
  },
  {
    icon: ccBNBIcon,
    name: 'ccBNB in Callisto',
    value: 'clo',
    symbol: 'ccBNB',
    chainId: 20729,
    address: '0xCc0524d86Ba37Cb36B21a14B118723eAF609aDd8',
    network: 'Callisto'
  },
  {
    icon: ccETHIcon,
    name: 'ccETH in Callisto',
    value: 'etc',
    symbol: 'ccETH',
    chainId: 20729,
    address: '0xcC208c32Cc6919af5d8026dAB7A3eC7A57CD1796',
    network: 'Callisto'
  },
  {
    icon: ccETCIcon,
    name: 'ccETC in Callisto',
    value: 'etc',
    symbol: 'ccETC',
    chainId: 20729,
    address: '0xCCc766f97629a4E14b3af8C91EC54f0b5664A69F',
    network: 'Callisto'
  },
  {
    icon: ccBUSDTIcon,
    name: 'BUSDT in Callisto',
    value: 'etc',
    symbol: 'BUSDT',
    chainId: 20729,
    address: '0xbf6c50889d3a620eb42C0F188b65aDe90De958c4',
    network: 'Callisto'
  }
];

// const Default = ({ children }: any) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 });
//   return isNotMobile ? children : null;
// };

const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export default function Transfer() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { account, chainId } = useActiveWeb3React();
  // const [networkOne, setNetworkOne] = useState(null);

  useEffect(() => {
    if (!account) {
      navigate('/');
    }
  }, [account, navigate]);

  const onSelectToken = (option: any) => {
    // setNetworkOne(option.value);
    if (option.chainId !== chainId) {
      toast.warning(`Please switch network to ${option.network}`);
      return;
    }
    registerToken(option.address, option.symbol, 18);
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
        {/* <Default>
          <ClaimPet />
        </Default> */}

        <div className="transfer__content__steps">
          <h4>{t('Transfert complete!')}</h4>
          <h6 className="mt-5">{t('You don’t see your tokens?')}</h6>
          <h6 className="mt-3">{t('Just add your asset to your wallet by clicking on its icon!')}</h6>
          <TokenSelection options={options} onChange={onSelectToken} className="transfer__selection" />
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
