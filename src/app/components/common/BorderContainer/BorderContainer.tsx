import classNames from 'classnames';
import React from 'react';
import './bordercontainer.css';

type props = {
  children: any;
  className?: string;
  onClick?: () => void;
};

export default function BorderContainer({ children, className, onClick }: props) {
  return (
    <div className={classNames('bordercontainer', className)} onClick={onClick}>
      {children}
    </div>
  );
}
