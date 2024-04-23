'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form, Nav } from 'reactstrap';

import { ButtonMaker, ImageMaker, OffcanvasMaker } from '@components';
import { Link, usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';

import ToolbarItems from './toolbar-items/ToolbarItems';
import MobileNav from '../../MobileNav';

const Topbar = ({ links }: { links: Array<{ name: string; href: string; className?: string }> }) => {
  const [canvasToggler, setCanvasToggler] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const search = () => {
    if (searchInputRef && searchInputRef.current?.value) {
      router.push(`/list?keyword=${encodeURIComponent(searchInputRef.current?.value)}`);
    }
  };

  useEffect(() => {
    if (pathName) {
      if (searchParams.has('keyword')) setKeyword(searchParams.get('keyword') ?? '');
      else setKeyword('');
    }
  }, [pathName, searchParams]);

  const offCanvasToggler = () => {
    setCanvasToggler(!canvasToggler);
  };

  const t = useTranslate('COMP_ToolBar');
  return (
    <div className="flex-between py-2">
      <div className="d-flex align-items-center">
        <ButtonMaker onClick={offCanvasToggler} design="border-0 d-lg-none pe-3 bg-white">
          <i className="fa-solid fa-bars text-primary"></i>
        </ButtonMaker>
        <OffcanvasMaker
          headerClass="border-bottom"
          header={
            <Link href="/" className="width-80">
              <ImageMaker src="/images/logo.png" />
            </Link>
          }
          canvasBody={
            <Nav>
              <MobileNav items={links} onClick={offCanvasToggler} />
            </Nav>
          }
          isOpen={canvasToggler}
          offcavasToggler={offCanvasToggler}
          closeIcon={<i className="fa-regular fa-circle-xmark text-black opacity-25 fw-lighter fa-xl"></i>}
        />
        <Link href={'/'} className="width-70">
          <ImageMaker src="/images/logo.png " alt="FreshlyFit" />
        </Link>
      </div>
      <div className="flex-grow-1 px-5 d-none d-lg-block">
        <Form key={pathName} className="d-flex w-75">
          <React.Fragment>
            <input
              ref={searchInputRef}
              defaultValue={keyword}
              onKeyDown={e => {
                if (e && e.key === 'Enter') {
                  e.preventDefault();
                  search();
                }
              }}
              type={'text'}
              className="w-100 round-end-0 round-start-5 form-control"
            />
            <ButtonMaker
              design="round-start-0 round-end-5 bg-dark-blue px-3"
              type="submit"
              block={false}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                search();
              }}
            >
              {t('SEARCH')}
            </ButtonMaker>
          </React.Fragment>
        </Form>
      </div>
      <ToolbarItems />
    </div>
  );
};

export default Topbar;
