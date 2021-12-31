import classNames from 'classnames';
import React from 'react';
import './custombutton.css';

type props = {
  children: any;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function CustomButton({ className, children, disabled, onClick }: props) {
  return (
    <button className={classNames('custombutton', className)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
