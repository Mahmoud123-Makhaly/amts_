import React, { ReactNode } from 'react';

const Floating = ({ className, children }: { className: string; children: ReactNode }) => {
  return <div className={`position-fixed ${className}`}>{children}</div>;
};

export default Floating;
