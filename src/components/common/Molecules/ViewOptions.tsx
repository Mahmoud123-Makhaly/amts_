import React from 'react';
import { ButtonMaker } from '@components';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface IViewOptions {
  buttonClass?: string;
  view: string;
  setView: (type: string) => void;
  grid?: boolean;
  list?: boolean;
  inline?: boolean;
  gridImg?: string | StaticImport;
  activeGridImg?: string | StaticImport;
  listImg?: string | StaticImport;
  listActiveImg?: string | StaticImport;
  inlineImg?: string | StaticImport;
  inlineActiveImg?: string | StaticImport;
  className?: string;
}

const ViewOptions = (props: IViewOptions) => {
  const {
    buttonClass,
    grid,
    inline,
    list,
    view,
    setView,
    activeGridImg,
    gridImg,
    inlineActiveImg,
    inlineImg,
    listActiveImg,
    listImg,
    className,
  } = props;
  return (
    <div className={`d-flex ${className}`}>
      {grid && (
        <ButtonMaker onClick={() => setView('grid')} design={`p-0 bg-transparent ${buttonClass}`}>
          <Image
            src={view === 'grid' ? activeGridImg! : gridImg!}
            alt=""
            width={34}
            height={34}
          />
        </ButtonMaker>
      )}
      {list && (
        <ButtonMaker onClick={() => setView('list')} design={`p-0 bg-transparent ${buttonClass}`}>
          <Image src={view === 'list' ? listActiveImg! : listImg!} alt="" width={34} height={34} />
        </ButtonMaker>
      )}
      {inline && (
        <ButtonMaker onClick={() => setView('inline')} design={`p-0 bg-transparent ${buttonClass}`}>
          <Image src={view === 'inline' ? inlineActiveImg! : inlineImg!} alt="" width={34} height={34} />
        </ButtonMaker>
      )}
    </div>
  );
};

export default ViewOptions;
