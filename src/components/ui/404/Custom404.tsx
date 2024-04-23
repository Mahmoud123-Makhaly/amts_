import React from 'react';

import { ImageMaker, Message } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

const Custom404 = () => {
  const t = useTranslate('COMP_Custom404');
  return (
    <Message>
      <div className="marginy-50 flex-col gap-4">
        <ImageMaker src="/images/404/notFound.png" />
        <h5 className="text-black">{t('NOT_FOUND_MESSAGE')}</h5>
        <Link href={'/'} className="border py-2 px-3 rounded bg-primary text-white">
          {t('BACK_TO_HOME')}
        </Link>
      </div>
    </Message>
  );
};

export default Custom404;
