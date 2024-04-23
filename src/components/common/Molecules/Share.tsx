'use client';
import React from 'react';

const Share = ({
  children,
  shareTo,
  url,
  className,
}: {
  children: React.ReactNode;
  shareTo: 'facebook' | 'whatsapp';
  url: string;
  className?: string;
}) => {
  // function isMobileOrTablet() {
  //   return /(android|iphone|ipad|mobile)/i.test(navigator?.userAgent) ?? undefined;
  // }

  const path =
    shareTo === 'facebook'
      ? 'https://www.facebook.com/sharer/sharer.php?u='
      : 'https://' + 'web' + '.whatsapp.com/send?text=';

  return (
    <React.Fragment>
      <a href={`${path}${url}`} target="_blank" className={className}>
        {children}
      </a>
    </React.Fragment>
  );
};

export default Share;
