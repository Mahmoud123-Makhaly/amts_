import React, { ReactNode } from 'react';
import NavItems from './NavItems';
import { Container, Nav } from 'reactstrap';
import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';
interface INavbarProps {
  links: Array<{ name: string; href: string; className?: string }>;
  children?: ReactNode;
  className?: string;
}
const Navbar = ({ links, children, className }: INavbarProps) => {
  return (
    <Nav className={className}>
      <div className="w-50 flex-between">
        <NavItems links={links} />
      </div>
      {children}
    </Nav>
  );
};

export default Navbar;
