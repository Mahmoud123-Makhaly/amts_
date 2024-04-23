import React from 'react';
import { ImageMaker } from '@components';

interface IMapProps {
  imgSrc: string;
  className?: string;
}
const Map = (props: IMapProps) => {
  const { imgSrc, className } = props;
  return <ImageMaker src={imgSrc} className={className || ''} />;
};

export default Map;
