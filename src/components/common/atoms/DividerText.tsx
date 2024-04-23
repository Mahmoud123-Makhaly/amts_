import React from 'react';
interface IDividerTextProps {
  className?: string;
  text: string;
}
const DividerText = ({ className, text }: IDividerTextProps) => {
  return (
    <div className={`divider-text flex-center w-100 my-4 ${className}`}>
      <p className="text-center fw-bold mx-3 my-0">{text}</p>
    </div>
  );
};

export default DividerText;
