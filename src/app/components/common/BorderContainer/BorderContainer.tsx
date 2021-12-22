import classNames from 'classnames';
import React from 'react';
import './bordercontainer.css';

type props = {
  children: any;
  className?: string;
};

export default function BorderContainer({ children, className }: props) {
  return <div className={classNames('bordercontainer', className)}>{children}</div>;
}
