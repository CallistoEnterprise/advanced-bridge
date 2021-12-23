import classNames from 'classnames';
import React from 'react';
import './custombutton.css';

type props = {
  children: any;
  className?: string;
  onClick?: () => void;
};

export default function CustomButton({ className, children, onClick }: props) {
  return (
    <button className={classNames('custombutton', className)} onClick={onClick}>
      {children}
    </button>
  );
}
