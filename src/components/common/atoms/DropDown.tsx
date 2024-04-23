'use client';
import { Divider } from 'primereact/divider';
import React, { ReactNode, useState } from 'react';
import { Dropdown, DropdownItem, DropdownItemProps, DropdownMenu, DropdownProps, DropdownToggle } from 'reactstrap';
export interface IDropDownItem {
  text: string;
  onClick?: any;
  href?: string;
  className?: string;
  divider?: boolean;
}
export interface IDropDown extends Omit<DropdownProps, 'title'> {
  title?: ReactNode;
  menuItems?: Array<IDropDownItem>;
  children?: ReactNode;
  caret?: boolean;
  headerClassName?: string;
  openOnHover?: boolean;
  titleSwitch?: boolean;
}
const DropDown = (props: IDropDown) => {
  const {
    menuItems,
    title,
    children,
    menuClassName,
    openOnHover = false,
    headerClassName,
    caret = true,
    titleSwitch,
    ...rest
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  const [header, setHeader] = useState<string | ReactNode>(title);
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={toggleMenu}
      onMouseEnter={openOnHover ? handleMouseEnter : undefined}
      onMouseLeave={openOnHover ? handleMouseLeave : undefined}
      {...rest}
    >
      <DropdownToggle caret={caret} className={headerClassName}>
        {header}
      </DropdownToggle>
      <DropdownMenu className={menuClassName}>
        {menuItems &&
          menuItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownItem
                  className={item.className}
                  onClick={() => {
                    {
                      item.onClick && item.onClick();
                    }
                    if (titleSwitch) {
                      setHeader(item.text);
                    }
                  }}
                  href={item.href}
                >
                  {item.text}
                </DropdownItem>
                {item.divider && <Divider className="m-0" />}
              </React.Fragment>
            );
          })}
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
