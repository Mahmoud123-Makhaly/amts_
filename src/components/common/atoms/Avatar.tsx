import React, { ReactNode, useMemo } from 'react';
import { Avatar as PrimeAvatar } from 'primereact/avatar';
interface IAvatarProps {
  img?: string;
  size?: 'normal' | 'large' | 'xlarge';
  shape?: 'square' | 'circle';
  className?: string;
  label?: string;
  children?: ReactNode;
}
const Avatar = (props: IAvatarProps) => {
  const { img, size, label, shape, className, children } = props;

  return (
    <PrimeAvatar image={img} size={size} shape={shape} className={className} label={label}>
      {children}
    </PrimeAvatar>
  );
};

export default Avatar;
