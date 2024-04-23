import React from 'react';
import { Badge } from 'reactstrap';
interface IBadge {
  color?: string;
  text: string;
  className?: string;
}
const BadgeMaker = (props: IBadge) => {
  const { color = 'primary', text, className } = props;
  return (
    <Badge className={className} color={color}>
      {text}
    </Badge>
  );
};

export default BadgeMaker;
