import React, { ReactNode } from 'react';

const mask = ({ children, className }: { children: ReactNode; className: string }) => {
  return <div className={`position-absolute w-100 h-100 flex-center opacity-50 ${className}`}>{children}</div>;
};

export default mask;
