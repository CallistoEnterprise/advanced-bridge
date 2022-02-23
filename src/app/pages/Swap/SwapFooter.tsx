import React from 'react';
import { useTranslation } from 'react-i18next';

type SwapFooterProps = {
  values: {
    swap_amount: string;
    buy_amount: string;
  };
};

const SwapFooter = ({ values }: SwapFooterProps) => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="swapform__subtext">
          <strong>{t('Minimum received')}</strong>
        </p>
        <div className="receive_tokens">
          <p className="swapform__subtext">{`${values.swap_amount}`}</p>
          <p className="swapform__subtext margin-top-5">{`${values.buy_amount} CLO`}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <p className="swapform__subtext">
          <strong>{t('Price impact')}</strong>
        </p>
        <p className="swapform__subtext">{`<0.5%`}</p>
      </div>
    </div>
  );
};

export default SwapFooter;
