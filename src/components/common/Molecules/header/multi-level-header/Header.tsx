'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Form } from 'reactstrap';

import { Link, usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';
import { ButtonMaker } from '@components';

import Infobar from '../Infobar';
import Navbar from './navbar/Navbar';
import Topbar from './topbar/Topbar';

const Header = () => {
  const t = useTranslate('COMP_Header');

  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const links = [
    { name: t('HOME'), href: '/', className: '' },
    { name: t('SERVICES'), href: '/services', className: '' },
    { name: t('PRODUCTS'), href: '/list', className: '' },
    { name: t('MATERIALS'), href: '/materials', className: '' },
    { name: t('PACKAGES'), href: '/packages/individual', className: '' },
    { name: t('CONTACT_US'), href: '/contact-us', className: '' },
  ];

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

  return (
    <header>
      <div className="bg-yellow">
        <Container>
          <Infobar info={t('INFO')} className="flex-between py-1" />
        </Container>
      </div>
      <div className="border-bottom">
        <Container>
          <Topbar links={links} />
        </Container>
      </div>
      <div className="border-bottom">
        <Container className="flex-between">
          <Navbar links={links} className="flex-between w-100 d-none d-lg-flex">
            <div className="d-flex align-items-center gap-3">
              <a href="tel:(971) 52 835 8482" className="border border-dark-blue text-dark-blue rounded py-2 px-3">
                {t('CALL_US')}
              </a>
              <Link href={'/find-your-services'} className="text-white rounded bg-dark-blue py-2 px-3">
                {t('BOOK_NOW')}
              </Link>
            </div>
          </Navbar>
          <Form key={pathName} className="d-flex my-2 w-100 d-lg-none">
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
                <i className="fa-solid fa-magnifying-glass"></i>
              </ButtonMaker>
            </React.Fragment>
          </Form>
        </Container>
      </div>
    </header>
  );
};

export default Header;
