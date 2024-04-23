'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container, Nav } from 'reactstrap';

import { Link, usePathname, useRouter } from '@navigation';
import { Avatar, ButtonMaker, ImageMaker, OffcanvasMaker, Search } from '@components';
import { useTranslate, useAppStore } from '@app/hooks';
import { Actions } from '@libs/actions';

import Navbar from './navbar/Navbar';
import Infobar from '../Infobar';
import LanguageSelect from '../multi-level-header/topbar/toolbar-items/LanguageSelect';
import MobileNav from '../MobileNav';

const Header = () => {
  const t = useTranslate('COMP_Header');
  const [canvasToggler, setCanvasToggler] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: t('HOME'), href: '/', className: '' },
    { name: t('SERVICES'), href: '/services', className: '' },
    { name: t('PRODUCTS'), href: '/list', className: '' },
    { name: t('ABOUT_US'), href: '/about-us', className: '' },
  ];

 
  const { changeDefaultCart, cart, user, isCartLoaded } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    cart: state.cart.default,
    isCartLoaded: state.cart.isLoaded,
    user: state.appAccount.user,
  }));

  useEffect(() => {
    const loadDefaultCart = async () => {
      if (user && !isCartLoaded && (!cart || !cart.id)) {
        const { data: cartResponse, serverError, validationErrors } = await Actions.cart.getOrCreateDefaultCart();
        if (cartResponse?.data) {
          changeDefaultCart && changeDefaultCart(cartResponse.data);
        } else {
        }
      }
    };
    loadDefaultCart();
  }, [cart, changeDefaultCart, isCartLoaded, user]);
  // useEffect(() => {
  //   if (pathName) {
  //     if (searchParams.has('keyword')) setKeyword(searchParams.get('keyword') ?? '');
  //     else setKeyword('');
  //   }
  // }, [pathName, searchParams]);

  return (
    <header className="flex-header py-2 py-lg-0">
      <Container className="flex-between">
        <Link href={'/'}>
          <ImageMaker src="/images/logo.png " alt="amts" width={90} height={32} />
        </Link>
        <Navbar links={links} className="flex-between d-none d-lg-flex" />
        <div className="flex gap-2">
          <Link href={'/cart'} className="flex-center">
            <ImageMaker src="/images/svgs/header/cart.svg" width={28} height={24} />
            {(cart?.items?.length ?? 0) > 0 && (
              <span className="bg-secondary ms-3 mb-4 font-16 fw-medium flex-center rounded-circle position-absolute outline-icon-20 mini-cart-summary">
                <span>{cart?.items?.length}</span>
              </span>
            )}
          </Link>
          <Link href={'/cart'} className="flex-center">
            <ImageMaker src="/images/svgs/header/bell.svg" />
          </Link>
          {!session?.isAuthorized ? (
            <Link href={'/auth/login'} className="bg-primary  rounded px-1 px-lg-2 py-1 flex gap-1">
              <ImageMaker src="/images/svgs/account/profile.svg" />
              <p className="fw-medium text-white d-none d-lg-block">{t('LOGIN')}</p>
            </Link>
          ) : (
            <Link href={'/profile/my-account'} className="rounded flex">
              <Avatar img="/images/home/avatars/1.png" />
            </Link>
          )}

          <LanguageSelect />
          <ButtonMaker onClick={() => setCanvasToggler(!canvasToggler)} design="border-0 p-0 d-lg-none bg-white">
            <i className="fa-solid fa-bars text-primary"></i>
          </ButtonMaker>
          <OffcanvasMaker
            header={
              <Link href="/" className="width-80">
                <ImageMaker src="/images/logo.png" />
              </Link>
            }
            canvasBody={
              <Nav>
                <MobileNav items={links} onClick={() => setCanvasToggler(!canvasToggler)} />
              </Nav>
            }
            direction="end"
            isOpen={canvasToggler}
            offcavasToggler={() => setCanvasToggler(!canvasToggler)}
            closeIcon={<i className="fa-solid fa-xmark font-20 text-black"></i>}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
