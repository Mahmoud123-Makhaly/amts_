'use client';

import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
interface IVTabsProps {
  tabs: Array<{ title: string; link: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void }>;
  icon?: 'caret' | 'chevron' | 'arrow';
}
const VTabs = (props: IVTabsProps) => {
  const { tabs, icon } = props;
  const path = usePathname();
  const locale = useLocale();
  return (
    <Nav pills className="vtabs flex-column" id="v-pills-tab">
      {tabs.map((tab, index) => (
        <NavItem key={index + 1}>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classnames({
              active: path.includes(tab.link),
            })}
            href={`/${locale}${tab.link}  `}
            onClick={tab.onClick}
          >
            <div className="flex-between">
              <div className="w-100 v-tab-title">{tab.title}</div>
              {icon && <i className={`fa-solid fa-${icon}-right text-disabled`}></i>}
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default VTabs;
