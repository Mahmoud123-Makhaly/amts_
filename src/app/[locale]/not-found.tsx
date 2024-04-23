'use client';

import React, { useEffect } from 'react';

import { useRouter } from '@navigation';

const NotFoundPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/404');
  }, [router]);
  return <React.Fragment></React.Fragment>;
};
export default NotFoundPage;
