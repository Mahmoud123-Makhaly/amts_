import Image from 'next/image';
import React from 'react';

interface IProductPropertyProps {
  text: string;
  img?: string;
  imgClassName?: string;
  alt?: string;
  className?: string;
}
const ProductProperty = ({ text, className, img, imgClassName }: IProductPropertyProps) => {
  return (
    <div className={`flex-between gap-2 ${className}`}>
      {img && (
        <div className={`p-1 rounded ${imgClassName}`}>
          <Image src={img} alt="" width={30} height={30} />
        </div>
      )}
      <p className="font-12">{text}</p>
    </div>
  );
};

export default ProductProperty;
