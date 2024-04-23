import { ImageMaker } from "@components";
import { Link } from "@navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React, { ReactNode } from "react";
interface IMessage {
  img?: string | StaticImport;
  alt?: string;
  text?: string;
  children?: ReactNode;
  btnContent?: string | ReactNode;
  href?: string;
  textDesign?: string;
  btnDesign?: string;
  className?: string;
}
const Message = (props: IMessage) => {
  const {
    img,
    text,
    btnContent,
    href,
    btnDesign,
    textDesign,
    alt,
    children,
    className,
  } = props;
  return (
    <div className={`flex-col ${className}`}>
      {img && <ImageMaker src={img} alt={alt} />}
      {children}
      {text && <p className={textDesign}>{text}</p>}
      {btnContent && href ? (
        <Link href={href!} className={btnDesign}>
          {btnContent}
        </Link>
      ) : (
        btnContent
      )}
    </div>
  );
};

export default Message;
