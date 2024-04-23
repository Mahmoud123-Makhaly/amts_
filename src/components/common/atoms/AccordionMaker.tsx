'use client';

import React, { useState } from 'react';
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem, AccordionProps } from 'reactstrap';

interface IAccordionMakerProps extends Omit<AccordionProps, 'toggle' | 'open'> {
  items: Array<
    | {
        header: React.ReactNode;
        content: React.ReactNode;
        id?: string;
      }
    | undefined
  >;
  headerClass?: string;
  defaultOpen?: Array<string>;
  stayOpen?: boolean;
  toggle?: (targetId: string) => void;
  open?: boolean;
  bodyClass?: string;
}

const AccordionMaker = (props: IAccordionMakerProps) => {
  const { items, headerClass, defaultOpen, stayOpen, toggle, open, bodyClass, ...rest } = props;
  const [isOpen, setIsOpen] = useState<Array<string>>(defaultOpen && defaultOpen.length ? defaultOpen : []);

  const toggler = (id: string) => {
    if (!isOpen.includes(id)) {
      setIsOpen(prev => [...prev, id]);
    } else if (isOpen.includes(id)) {
      setIsOpen(prev => prev.filter(x => x != id));
    }
  };
  return (
    <UncontrolledAccordion
      stayOpen={stayOpen}
      defaultOpen={isOpen}
      className="accordion-flush mx-2"
      toggle={toggle ?? toggler}
      {...rest}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item && (
            <AccordionItem key={index}>
              <AccordionHeader targetId={item.id ? item.id : `accordion-${index}`} className={headerClass}>
                {item.header}
                <i
                  className="fa-solid fa-chevron-down chevron d-flex justify-content-center align-items-center"
                  id={item.id ? item.id : `accordion-${index}`}
                ></i>
              </AccordionHeader>
              <AccordionBody
                accordionId={item.id ? item.id : `accordion-${index}`}
                aria-expanded="true"
                className={bodyClass}
              >
                <div className="p-0">{item.content}</div>
              </AccordionBody>
            </AccordionItem>
          )}
        </React.Fragment>
      ))}
    </UncontrolledAccordion>
  );
};

export default AccordionMaker;
