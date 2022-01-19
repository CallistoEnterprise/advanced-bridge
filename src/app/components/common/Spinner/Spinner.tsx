import classNames from 'classnames';
import React from 'react';

type spinnerProps = { text?: string; className?: string };

const Spinner = ({ text = 'Loading', className }: spinnerProps) => {
  return (
    <div className={classNames(className, 'spinner-border spinner-border-sm text-warning')} role="status">
      <span className="visually-hidden">{text}</span>
    </div>
  );
};

export default Spinner;
