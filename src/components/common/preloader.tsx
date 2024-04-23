'use client';

import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';

import { useAppStore } from '@app/hooks';
import { usePathname } from '@navigation';
import { changeHTMLAttribute } from '@utils';
import { Loader } from '@components';

const Preloader = () => {
  const pathName = usePathname();
  const { changePreloader, preloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
    preloader: state.layout.preloader,
  }));

  useEffect(() => {
    if (pathName && changePreloader) changePreloader('disable');
  }, [changePreloader, pathName]);

  useEffect(() => {
    if (preloader) {
      changeHTMLAttribute('data-preloader', preloader);
    }
  }, [preloader]);

  return (
    <div id="preloader">
      <Loader />
    </div>
  );
};
export default Preloader;
