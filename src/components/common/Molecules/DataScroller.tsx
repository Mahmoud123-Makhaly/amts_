import React, { ReactNode, useRef } from 'react';
import { DataScrollerProps, DataScroller as Scroller } from 'primereact/datascroller';
import { ButtonMaker } from '../index';
interface IDataScrollerProps extends DataScrollerProps {
  data: Array<any>;
  template: (item: any) => React.ReactNode;
  btnText?: string;
  btnClassName?: string;
  btnSize?: 'block' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children?: ReactNode;
}
const DataScroller = (props: IDataScrollerProps) => {
  const { data, rows, template, btnClassName, btnSize, btnText, children, ...rest } = props;
  const ds = useRef<Scroller>(null);
  const footer = (
    <ButtonMaker text={btnText} design={btnClassName} size={btnSize} onClick={() => ds.current?.load()}>
      {children}
    </ButtonMaker>
  );
  return <Scroller ref={ds} loader value={data} itemTemplate={template} rows={rows} footer={footer} {...rest} />;
};

export default DataScroller;
