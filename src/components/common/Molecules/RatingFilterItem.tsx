'use client';
import React from 'react';
import { Input, InputProps, Label } from 'reactstrap';

interface ISidebarFilterItemProps extends InputProps {
  name?: string;
  label?: string | React.ReactNode;
  id?: string;
  containerClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RatingFilterItem = ({
  type,
  name,
  label,
  id,
  onChange,
  ...rest
}: ISidebarFilterItemProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <Input className="form-check-input m-0" type={type} name={name || 'rate'} id={id} onChange={onChange} {...rest} />
      <Label htmlFor={id} className="font-14 text-black text-break m-0">
        {label}
      </Label>
    </div>
  );
};

export default RatingFilterItem;
