import React from 'react';
import './forminput.css';

type propsType = {
  field: any;
  form: any;
  value?: string;
  groupname?: string;
  className?: string;
  onChange?: (e: any) => void;
};

export default function FormInput({ field, form: { touched, errors }, ...props }: propsType) {
  return (
    <div className="forminput">
      <div className="input-group mb-3">
        <input className="form-control" value={props.value} onChange={props.onChange} {...field} {...props} />
        {props.groupname && (
          <span className="input-group-text" id="basic-addon2">
            {props.groupname}
          </span>
        )}
      </div>
      {/* {touched[field.name] && errors[field.name] && <div>{errors[field.name]}</div>} */}
    </div>
  );
}
