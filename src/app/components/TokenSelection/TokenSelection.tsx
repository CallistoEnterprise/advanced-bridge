import classNames from 'classnames';
import React from 'react';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import './tokenselection.css';

interface token {
  name: string;
  symbol: string;
  icon: string;
  decimals: {
    CLO: number;
    BNB: number;
    ETH: number;
    ETC: number;
  };
  addresses: {
    CLO: string;
    BNB: string;
    ETH: string;
    ETC: string;
  };
  addressesTest?: {
    CLO: string;
    BNB: string;
    ETH: string;
  };
}

type props = {
  options: Array<token>;
  onChange?: (option: token) => void;
  className?: string;
};

export default function TokenSelection({ options, className, onChange }: props) {
  return (
    <div className="tokenselection">
      <RadioGroup containerStyle={classNames('tokenselection-container', className)} onChange={onChange}>
        {options.map((option, index) => (
          <Radio
            key={index}
            value={option}
            render={({ isSelected }: any) => (
              <button
                className={classNames('tokenselection-option', {
                  'tokenselection-selected': isSelected
                })}
              >
                <div>
                  <img src={option.icon} alt="icon" />
                  {option.name}
                </div>
              </button>
            )}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
