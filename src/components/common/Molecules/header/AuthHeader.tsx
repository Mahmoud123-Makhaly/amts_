import React from 'react';
import { Container } from 'reactstrap';
import { ImageMaker } from '@components';
import LanguageSelect from './multi-level-header/topbar/toolbar-items/LanguageSelect';
import { Link } from '../../../../navigation';

const AuthHeader = () => {
  return (
    <header className="flex-header">
      <Container>
        <div className="flex-between py-1 ">
          <Link href={'/'}>
            <ImageMaker src="/images/logo.png" width={90} height={32} />
          </Link>
          <LanguageSelect />
        </div>
      </Container>
    </header>
  );
};

export default AuthHeader;
