import React, { ReactNode } from 'react';
import { MegaMenu as Mega, MegaMenuProps } from 'primereact/megamenu';
import { MenuItem } from 'primereact/menuitem';
interface IMegaMenuProps extends Omit<MegaMenuProps, 'model'> {
  items: MenuItem[];
}
const MegaMenu = (props: IMegaMenuProps) => {
  const { children, className, items, orientation, ...rest } = props;
  return (
    <Mega model={items} orientation={orientation} className={className} {...rest}>
      {children}
    </Mega>
  );
};

export default MegaMenu;
