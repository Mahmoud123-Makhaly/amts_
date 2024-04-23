'use client';

import React, { ReactNode } from 'react';
import { Modal, ModalBody, ModalHeader, ModalProps } from 'reactstrap';

interface IModalProps extends ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleShow?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  header?: ReactNode;
}
const Modals = (props: IModalProps) => {
  const { children, isOpen, size, header, toggleShow, centered = true, scrollable, fade, backdrop, className } = props;
  return (
    <Modal
      isOpen={isOpen}
      centered={centered}
      className={`modal ${className}`}
      size={size}
      toggle={toggleShow}
      scrollable={scrollable}
      fade={fade}
      backdrop={backdrop}
    >
      {header && <ModalHeader toggle={toggleShow}>{header}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default Modals;
