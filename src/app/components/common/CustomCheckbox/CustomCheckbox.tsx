import classNames from 'classnames';
import React from 'react';
import './customcheckbox.css';

type props = {
  label: string;
  className?: string;
  onChangeCheckbox?: (status: boolean) => void;
  checked?: boolean;
};

export default function CustomCheckbox({ label, className, checked = true, onChangeCheckbox }: props) {
  return (
    <div className={classNames('customcheckbox', className)}>
      <label className="container">
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChangeCheckbox && onChangeCheckbox(e.target.checked)}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
