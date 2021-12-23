import classNames from 'classnames';
import React from 'react';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import './networkselection.css';

interface network {
  icon: string;
  name: string;
  value: string;
}

type props = {
  options: Array<network>;
  onChange?: (option: network) => void;
};

export default function NetworkSelection({ options, onChange }: props) {
  return (
    <div className="networkselection">
      <RadioGroup containerStyle={classNames('networkselection-container')} onChange={onChange}>
        {options.map((option, index) => (
          <Radio
            key={index}
            value={option}
            render={({ isSelected }: any) => (
              <button
                className={classNames('networkselection-option', {
                  'networkselection-selected': isSelected
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
