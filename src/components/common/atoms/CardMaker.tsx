import React, { ReactNode } from 'react';
import { Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardProps, CardText } from 'reactstrap';
import { Link } from '@navigation';
import ImageMaker from './ImageMaker';

export interface ICardMakerProps extends CardProps {
  img?: string;
  imgWidth?: number;
  imgHeight?: number;
  alt?: string;
  children?: React.ReactNode;
  header?: ReactNode | string;
  className?: string;
  overlay?: boolean;
  overlayContent?: ReactNode | string;
  href?: string;
  imagePriority?: boolean;
}

const CardMaker = (props: ICardMakerProps) => {
  const {
    img,
    alt,
    children,
    className,
    header,
    href,
    overlay = false,
    overlayContent,
    imagePriority,
    imgWidth,
    imgHeight,
    ...rest
  } = props;
  const content = typeof overlayContent === 'string' ? <CardText>{overlayContent}</CardText> : overlayContent;
  return (
    <Card className={className} {...rest}>
      {header && <CardHeader className="bg-transparent m-0 pb-2">{header}</CardHeader>}
      {img &&
        (href ? (
          <Link href={href} className="card-img">
            <ImageMaker src={img} alt={alt} priority={imagePriority} width={imgWidth} height={imgHeight}></ImageMaker>
          </Link>
        ) : (
          <ImageMaker
            className="card-img"
            src={img}
            alt={alt}
            priority={imagePriority}
            width={imgWidth}
            height={imgHeight}
          ></ImageMaker>
        ))}
      {overlay && <CardImgOverlay>{content}</CardImgOverlay>}
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardMaker;
