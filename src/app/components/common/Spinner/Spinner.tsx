import classNames from 'classnames';
import React from 'react';

type spinnerProps = { text?: string; className?: string; variant?: string };

const Spinner = ({ text = 'Loading', className, variant = 'warning' }: spinnerProps) => {
  return (
    <div className={classNames(className, `spinner-border spinner-border-sm text-${variant}`)} role="status">
      <span className="visually-hidden">{text}</span>
    </div>
  );
};

export default Spinner;
