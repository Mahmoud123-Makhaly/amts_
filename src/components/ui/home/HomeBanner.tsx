import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from '@navigation';
import { Avatar, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { AvatarGroup } from 'primereact/avatargroup';

const HomeBanner = () => {
  const t = useTranslate('COMP_HomeBanner');
  return (
    <Row className="home-banner position-relative py-5 my-3">
      <Col md={6} className="flex-col order-md-1">
        <ImageMaker src={'/images/home/home-banner-desktop.jpg'} className="w-100" />
      </Col>
      <Col md={6} className="order-md-0 flex-col-start gap-3 justify-content-center order-md-0">
        <div className="w-75 flex-col-start">
          <h5 className="fw-semibold text-primary">{t('TITLE')}</h5>
          <p className="font-16">{t('SUBTITLE')}</p>
        </div>
        <div className="flex gap-4">
          <Link href={'tel:+9710522950070'} className="flex gap-2">
            <div className="outline-icon-60 rounded bg-secondary rounded-circle">
              <ImageMaker src={'/images/svgs/phone-outline.svg'} width={26} height={22} />
            </div>
            <div className="flex-col-start">
              <h6 className="fw-semibold">{t('CALL_US')}</h6>
              <p>+971 0522950070</p>
            </div>
          </Link>
          <Link
            href={'https://www.google.com/maps/search/?api=1&query=25.79032,55.960387'}
            target="_blank"
            className="flex gap-2"
          >
            <div className="outline-icon-60 rounded bg-secondary rounded-circle">
              <ImageMaker src={'/images/svgs/location.svg'} width={26} height={22} />
            </div>
            <div className="flex-col-start">
              <h6 className="fw-semibold">{t('ADDRESS')}</h6>
              <p>Area-Al Filaya, UAE</p>
            </div>
          </Link>
        </div>
        <div>
          <p className="fw-semibold">{t('POPULARITY')}</p>
          <AvatarGroup>
            <Avatar size="large" img="/images/home/avatars/1.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/2.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/3.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/4.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/5.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/6.png" shape="circle" />
            <Avatar label="500+" size="large" className="bg-secondary font-14" shape="circle" />
          </AvatarGroup>
        </div>
        <Link href={'/find-your-services'} className="btn-primary py-2 px-3 flex-between">
          {t('FIRST_LINK')}
          <i className="fa-solid fa-arrow-right ms-2 border rounded-circle outline-icon-22 flex-center"></i>
        </Link>
      </Col>
    </Row>
  );
};

export default HomeBanner;
