import { Rating, RatingProps } from 'primereact/rating';
import React from 'react';

interface IRateProps extends RatingProps {
  className?: string;
  readOnly?: boolean;
  stars?: number;
  value: number;
}
const Rate = (props: IRateProps) => {
  const { className, readOnly, stars = 5, value, cancel = false, ...rest } = props;
  return <Rating className={className} readOnly={readOnly} stars={stars} cancel={cancel} {...rest} value={value} />;
};

export default Rate;
