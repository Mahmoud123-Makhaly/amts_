'use client';
import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';

interface ISwitchButtonProps {
  className?: string;
  checked?: boolean;
  onClick?:React.MouseEventHandler<HTMLInputElement>;
}
const SwitchButton = (props: ISwitchButtonProps) => {
  const { className, checked,onClick } = props;

  return (
    <FormGroup switch className="p-0">
      <Input type="switch" checked={checked} className={className} onClick={onClick} />
    </FormGroup>
  );
};

export default SwitchButton;
