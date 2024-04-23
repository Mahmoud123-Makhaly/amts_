import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';
import { ImageMaker } from '.';
interface IFigure {
  img: string | StaticImport;
  text: string;
  textbg?: string;
  textBorder?: boolean;
  textColor?: string;
  textPosition: 'down' | 'floating';
  opacity?: 25 | 50 | 75;
  animatedText?: boolean;
  rounded?: string;
  className?: string;
  textAlign?: 'start' | 'center' | 'end';
  imgPadding?: string;
}
const Figure = ({
  img,
  text,
  textBorder = false,
  textbg,
  className,
  opacity,
  textPosition,
  textColor,
  rounded = '',
  textAlign = 'center',
  imgPadding='100%'
}: IFigure) => {
  return (
    <figure
      className={`figure ${rounded} ${className}`}
      style={
        textPosition === 'floating'
          ? { backgroundImage: `url("${img}")`, paddingBottom: imgPadding }
          : { backgroundImage: 'none', padding: 'none' }
      }
    >
      {textPosition === 'down' && <ImageMaker src={img} />}
      <figcaption
        className={`text-${textbg} bg-${textbg} opacity-${opacity} fig-caption ${
          textPosition === 'floating' && 'floating'
        } ${textBorder && 'border rounded rounded-top-0 border-top-0'}`}
      >
        <h6 className={`text-${textAlign} text-${textColor} px-2`}>{text}</h6>
      </figcaption>
    </figure>
  );
};

export default Figure;
