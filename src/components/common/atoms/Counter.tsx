'use client';

import React, { useState } from 'react';
import { Input, InputProps } from 'reactstrap';
interface ICounterProps extends Omit<InputProps, 'onChange'> {
  defaultValue: number;
  min: number;
  onChange: (val: number) => void;
  max?: number;
  carets?: boolean;
  id?: string;
  step?: number;
  design?: string;
}
const Counter = (props: ICounterProps) => {
  const { defaultValue, carets, id = 'counter', min = 1, max, step, onChange, design, ...rest } = props;
  const [count, setCount] = useState<number>(defaultValue);

  const handleIncrement = () => {
    if (max && count + (step ?? 1) <= max) {
      onChange(count + (step ?? 1));
      setCount(prev => prev + (step ?? 1));
    } else if (!max) {
      onChange(count + (step ?? 1));
      setCount(prev => prev + (step ?? 1));
    }
  };

  const handleDecrement = () => {
    if (count - (step ?? 1) >= min) {
      onChange(count - (step ?? 1));
      setCount(prev => prev - (step ?? 1));
    }
  };

  const validateInputValue = (value: number) => {
    return max ? (value > max ? max : value) : value;
  };

  return (
    <div className={`rounded-2 border border-primary py-2 px-2 width-110 flex-between ${design ?? ''}`}>
      {carets ? (
        <React.Fragment>
          <div className="icons flex-col justify-content-center me-2">
            <i
              className={`fa-solid fa-caret-up text-muted font-15${max && count + (step ?? 1) <= max ? '' : ' text-dimmed'}`}
              style={{ lineHeight: '0.6', cursor: 'pointer' }}
              onClick={handleIncrement}
            ></i>
            <i
              className={`fa-solid fa-caret-down text-muted font-15${count - (step ?? 1) >= min ? '' : ' text-dimmed'}`}
              style={{ lineHeight: '0.6', cursor: 'pointer' }}
              onClick={handleDecrement}
            ></i>
          </div>
          <Input
            className="font-12 border-0 p-0 text-center"
            name="counter"
            id={id}
            type="number"
            value={validateInputValue(count)}
            min={min}
            onChange={e => {
              setCount(validateInputValue(Number(e.currentTarget.valueAsNumber)));
            }}
            onChangeCapture={e => {
              onChange(isNaN(Number(e.currentTarget.value)) ? 1 : validateInputValue(Number(e.currentTarget.value)));
            }}
            {...rest}
          />
        </React.Fragment>
      ) : (
        <div className="flex-between py-1">
          <i
            className={`fa-solid fa-minus font-15 text-primary border-end pe-2 m-0 pointer${count - (step ?? 1) >= min ? '' : ' text-secondary'}`}
            onClick={handleDecrement}
          ></i>
          <Input
            className="font-12 border-0 p-0 text-center"
            type="number"
            name="counter"
            id={id}
            value={validateInputValue(count)}
            onChange={e => {
              setCount(validateInputValue(Number(e.currentTarget.valueAsNumber)));
            }}
            min={min}
            onChangeCapture={e => {
              onChange(isNaN(Number(e.currentTarget.value)) ? 1 : validateInputValue(Number(e.currentTarget.value)));
            }}
            {...rest}
          />
          <i
            className={`fa-solid fa-plus font-15 text-primary border-start ps-2 pointer${max && count + (step ?? 1) <= max ? '' : ' text-secondary'}`}
            onClick={handleIncrement}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Counter;
