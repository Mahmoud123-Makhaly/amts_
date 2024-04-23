'use client';
import React, { ReactNode } from 'react';
import { DropdownItemProps } from 'reactstrap';
import { MenuItem } from 'primereact/menuitem';

import { Link } from '@navigation';
import { AccordionMaker, ButtonMaker } from '@components';
import { useTranslate } from '@app/hooks';
interface IMobileNavProps {
  items: Array<{
    name: string;
    type?: 'link' | 'dropdown' | 'mega-menu';
    href?: string;
    icon?: React.ReactNode;
    menuItems?: Array<DropdownItemProps>;
    items?: MenuItem[];
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    component?: ReactNode;
  }>;
  onClick: () => void;
}
const MobileNav = (props: IMobileNavProps) => {
  const t = useTranslate('COMP_MobileNav');
  const mobileNavs = props.items.map(({ name, menuItems, onClick }) => {
    return { name, menuItems, onClick };
  });
  const accordionItems = mobileNavs.map(
    (item, index) =>
      item.menuItems && {
        header: <p key={index}>{item.name}</p>,
        content: (
          <ul>
            {item.menuItems?.map((inner, indexi) => (
              <Link href={inner.href!} key={indexi} className="pb-3 border-bottom mb-3 d-block" onClick={props.onClick}>
                {inner.children}
              </Link>
            ))}
            <span onClick={item.onClick}>
              <ButtonMaker
                design="bg-transparent border-0 text-dark p-0 font-14"
                onClick={props.onClick}
                text={t('ALL')}
              />
            </span>
          </ul>
        ),
      },
  );

  const links = props.items.filter((item, index) => {
    return !item.menuItems && item.name;
  });

  return (
    <div className="flex-col-start w-100">
      <AccordionMaker items={accordionItems} className="w-100 border-0" />

      {links.map((item, index) => (
        <Link
          className={`py-4 font-14 d-flex align-items-center gap-3 w-100 border-bottom border-light ${item.className}`}
          key={index}
          href={item.href!}
          onClick={props.onClick}
        >
          {item.name}
          {item.component}
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
