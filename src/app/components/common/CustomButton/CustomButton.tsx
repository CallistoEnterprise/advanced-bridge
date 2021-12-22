import classNames from 'classnames';
import React from 'react';
import './custombutton.css';

type props = {
  children: string;
  className?: string;
  onClick?: () => void;
};

export default function CustomButton({ className, children, onClick }: props) {
  return (
    <button className={classNames(className, 'custombutton')} onClick={onClick}>
      {children}
    </button>
  );
}
