'use client';

import React, { useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface ImageProps {
  src: string | StaticImport;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  role?: string;
}
const ImageMaker = (props: ImageProps) => {
  const { src, alt, className, fallbackSrc, priority, width, height, sizes, role, fill } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <div className={`position-relative  ${className}`}>
      <Image
        className="position-static"
        sizes={sizes}
        src={imgSrc}
        role={role}
        alt={alt || ''}
        priority={priority}
        width={width}
        height={height}
        fill={!width && !height ? true : false}
        // style={!fill ? { position: 'static' } : undefined}
        onError={() => {
          setImgSrc(fallbackSrc ?? '/images/HProductNoImg.png');
        }}
      />
    </div>
  );
};

export default ImageMaker;
