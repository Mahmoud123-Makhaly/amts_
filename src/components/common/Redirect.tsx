'use client';

import React, { useEffect } from 'react';

import { useRouter } from '@navigation';

const Redirect = ({ url, type = 'push' }: { url: string; type?: 'push' | 'replace' }) => {
  const router = useRouter();

  useEffect(() => {
    if (type === 'replace') router.replace(url);
    else router.push(url);
  }, [router, type, url]);

  return <></>;
};
export default Redirect;
