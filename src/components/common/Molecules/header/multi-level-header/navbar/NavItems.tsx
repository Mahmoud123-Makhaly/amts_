'use client';
import React, { ReactNode, useState } from 'react';
import { NavLink, Navbar } from 'reactstrap';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface INavProps {
  links: Array<{ name: string; href: string; className?: string }>;
}
const NavItems = (props: INavProps) => {
  const { links } = props;
  const [navMenu, setNavMenu] = useState('');

  const pathname = usePathname();
  const currentPathname = pathname.split('/').slice(2).join('/'); // Remove the locale

  return (
    <React.Fragment>
      {links.map((link, index) => {
        const navLinkPathname = link.href.slice(1);
        return (
          <NavLink
            key={index}
            href={link.href || undefined}
            className={`${link.className} ${clsx({
              active: currentPathname === navLinkPathname,
            })}`}
            onClick={() => {
              setNavMenu(navMenu === `${index}` ? '' : `${index}`);
            }}
          >
            {link.name}
          </NavLink>
        );
      })}
    </React.Fragment>
  );
};

export default NavItems;
