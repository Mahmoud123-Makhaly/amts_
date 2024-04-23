'use client';

import React, { ReactNode, useState } from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { ButtonMaker } from '.';
interface IOffcanvas {
  canvasBody: ReactNode;
  isOpen: boolean;
  direction?: 'start' | 'end' | 'bottom' | 'top';
  offcavasToggler: () => void;
  header?: ReactNode;
  headerClass?: string;
  className?: string;
  closeIcon?: ReactNode;
}
const OffcanvasMaker = (props: IOffcanvas) => {
  const { isOpen, canvasBody, offcavasToggler, direction = 'start', header, className, headerClass, closeIcon } = props;
  return (
    <Offcanvas direction={direction} isOpen={isOpen} toggle={offcavasToggler} className={className}>
      {header && (
        <OffcanvasHeader className={`flex-between ${headerClass}`}>
          {header}
          {closeIcon ? (
            <ButtonMaker design="bg-transparent text-dark canvas-close border-0" onClick={offcavasToggler}>
              {closeIcon}
            </ButtonMaker>
          ) : (
            <ButtonMaker close onClick={offcavasToggler} design="text-black font-14" />
          )}
        </OffcanvasHeader>
      )}
      <OffcanvasBody>{canvasBody}</OffcanvasBody>
    </Offcanvas>
  );
};

export default OffcanvasMaker;
