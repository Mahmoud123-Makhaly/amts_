import React, { ReactNode, useState } from 'react';

interface InfobarProps {
  info: string | ReactNode;
  className?: string;
}

const Infobar = ({ className, info }: InfobarProps) => {
  const [hide, setHide] = useState<boolean>();
  
  return (
    <div className={`${hide && 'd-none'} ${className}`}>
      <p className="fw-bold">{info}</p>
      <i
        className="fa-solid fa-xmark text-dark-blue border border-dark-blue rounded-circle outline-icon-20 pointer"
        onClick={() => setHide(true)}
      ></i>
    </div>
  );
};

export default Infobar;
