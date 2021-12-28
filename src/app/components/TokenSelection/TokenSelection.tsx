import classNames from 'classnames';
import React from 'react';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import './tokenselection.css';

interface network {
  icon: string;
  name: string;
  value: string;
}

type props = {
  options: Array<network>;
  onChange?: (option: network) => void;
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
