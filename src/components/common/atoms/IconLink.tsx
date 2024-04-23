import { Link } from '@navigation';
import React from 'react';
import { ButtonMaker } from '@components';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface IConLink {
  text: string;
  color?: string;
  textDesign?: string;
  textColor?: string;
  iconColor?: string;
  href?: string;
  width?: string;
  iconbg?: string;
  as?: 'button' | 'link';
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  fill?: boolean;
  icon?: 'arrow' | 'chevron' | 'caret' | 'xmark';
  className?: string;
  img?: string | StaticImport;
  blank?: boolean;
  iconDirection?: 'right' | 'left';
}
const IconLink = ({
  color = 'primary',
  text,
  textDesign,
  href,
  blank,
  width,
  iconbg = 'white',
  textColor = 'white',
  iconDirection = 'right',
  iconColor,
  as = 'link',
  icon = 'arrow',
  fill,
  onClick,
  type = 'button',
  className,
  img,
}: IConLink) => {
  const btnColor = fill === true ? color : 'transparent';
  return (
    <React.Fragment>
      {as === 'link' ? (
        blank ? (
          <a
            href={href!}
            target="_blank"
            className={`text-start flex-between px-3 py-2 rounded bg-${btnColor} ${className}`}
            style={{ width: width }}
          >
            <p className={`text-${textColor} text-nowrap ${textDesign}`}>{text}</p>
            {img ? (
              <Image src={img} alt="icon" width={20} height={20} />
            ) : (
              <i
                className={`fa-solid fa-${icon}-${iconDirection} p-1 rounded mx-2 bg-${iconbg} text-${btnColor} text-${iconColor}`}
              ></i>
            )}
          </a>
        ) : (
          <Link
            href={href!}
            className={`text-start flex-between px-3 py-2 rounded bg-${btnColor} ${className}`}
            style={{ width: width }}
          >
            <p className={`text-${textColor} text-nowrap ${textDesign}`}>{text}</p>
            {img ? (
              <Image src={img} alt="icon" width={20} height={20} />
            ) : (
              <i
                className={`fa-solid fa-${icon}-${iconDirection} p-1 rounded mx-2 bg-${iconbg} text-${btnColor} text-${iconColor}`}
              ></i>
            )}
          </Link>
        )
      ) : (
        <ButtonMaker
          onClick={onClick}
          type={type}
          design={`text-start bg-${btnColor} flex-between px-3 py-2 rounded ${className}`}
        >
          <p className={`${textDesign} text-${textColor} text-nowrap`}>{text}</p>
          {img ? (
            <Image src={img} alt="icon" width={20} height={20} />
          ) : (
            <i
              className={`fa-solid fa-${icon}-${iconDirection} bg-${iconbg} text-${btnColor} p-1 rounded mx-2 text-${iconColor}`}
            ></i>
          )}
        </ButtonMaker>
      )}
    </React.Fragment>
  );
};

export default IconLink;
