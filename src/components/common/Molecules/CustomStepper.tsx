'use client';
import React, { ReactNode, useState } from 'react';
interface ICompStepsProps {
  className?: string;
  steps: Array<ReactNode>;
  activeIndex?: number;
  activeClassName?: string;
  readonly?: boolean;
}
const CustomStepper = (props: ICompStepsProps) => {
  const { steps, activeIndex = 0, className, readonly, activeClassName } = props;
  const [active, setActive] = useState<number>(activeIndex);
  return (
    <div className={className}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={index === active ? activeClassName : undefined}
          onClick={() => !readonly && setActive(index)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
