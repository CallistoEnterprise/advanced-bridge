import classNames from 'classnames';
import React from 'react';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import { INetwork } from '~/app/constants/interface';
import './networkselection.css';

type props = {
  options: Array<INetwork>;
  selected?: string;
  onChange?: (option: INetwork) => void;
};

export default function NetworkSelection({ options, selected, onChange }: props) {
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
                  <img src={option.img} alt="icon" />
                  {option.symbol}
                </div>
              </button>
            )}
            isDisabled={option.symbol === selected}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
