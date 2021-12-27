import classNames from 'classnames';
import React from 'react';
import './customcheckbox.css';

type props = {
  label: string;
  className?: string;
};

export default function CustomCheckbox({ label, className }: props) {
  return (
    <div className={classNames('customcheckbox', className)}>
      <label className="container">
        {label}
        <input type="checkbox" checked />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
