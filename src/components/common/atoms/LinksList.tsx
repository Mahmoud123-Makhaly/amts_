import { Link } from '@navigation';
import React, { ReactNode } from 'react';

interface ILinksListProps {
  links: Array<{ text: string | ReactNode; href: string; className: string }>;
  dividers?: boolean;
  className?: string;
  borderColor?: string;
  header?: string;
  headerClassName: string;
}
const LinksList = (props: ILinksListProps) => {
  const { links, dividers, className, borderColor = 'primary', header, headerClassName } = props;
  return (
    <ul className={`flex-col-start  ${className}`}>
      <h4 className={headerClassName}>{header}</h4>
      {links.map((item, index) => {
        return (
          <li key={index} className={`${dividers && `border-bottom border-${borderColor}`}  ${item.className}`}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LinksList;
