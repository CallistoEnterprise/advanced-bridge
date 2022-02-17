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
        <p className="swapform__subtext">{values.swap_amount} CLO</p>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <p className="swapform__subtext">
          <strong>{t('Price impact')}</strong>
        </p>
        <p className="swapform__subtext">{`<0.1%`}</p>
      </div>
    </div>
  );
};

export default SwapFooter;
