'use client';
import React from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import Subscribe from './Subscribe';
import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';
import { ImageMaker } from '@components';

const Footer = () => {
  const t = useTranslate('COMP_Footer');
  return (
    <footer className="text-white">
      <div className="bg-primary py-5">
        <Container>
          <Row>
            <Col md={3}>
              <ImageMaker src={'/images/footer/logo.png'} width={137} height={48} className="pb-3" />
              <p className="pt-3 text-white">{t('SUMMARY')}</p>
            </Col>
            <Col md={3}>
              <h6 className="fw-semibold font-18 text-white mb-3">{t('LINKS')}</h6>
              <ul className="flex-col-start gap-3">
                <li>
                  <Link href={'/about-us'} className="font-14">
                    {t('ABOUT_US')}
                  </Link>
                </li>
                <li>
                  <Link href={'/contact-us'} className="font-14">
                    {t('CONTACT_US')}
                  </Link>
                </li>
                <li>
                  <Link href={'/contact-us'} className="font-14">
                    {t('FAQ')}
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h6 className="fw-semibold font-18 text-white mb-3">{t('CONTACT_US')}</h6>
              <ul className="flex-col-start gap-3">
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=25.79032,55.960387"
                    target="_blank"
                    className="d-flex align-items-center gap-2"
                  >
                    <ImageMaker src={'/images/svgs/footer/location.svg'} width={18} height={24} />
                    <p className="text-white font-14">Area - Al Filaya, Office No.8 R.A.K, United Arab Emirates</p>
                  </a>
                </li>
                <li>
                  <a href="tel:(971) 52 835 8482" className="d-flex align-items-center gap-2">
                    <ImageMaker src={'/images/svgs/footer/phone.svg'} width={24} height={24} />
                    <p className="text-white font-14">+971 0522950070</p>
                  </a>
                </li>
                <li>
                  <a href="mailto:amtspc@gmail.com" className="d-flex align-items-center gap-2">
                    <ImageMaker src={'/images/svgs/footer/mail.svg'} width={24} height={20} />
                    <p className="text-white font-14">amtspc@gmail.com</p>
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h6 className="fw-semibold font-18 text-white mb-3">{t('FOLLOW_US')}</h6>
              <ul className="flex-between gap-2 my-3">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <ImageMaker src={'/images/svgs/social/facebook-white.svg'} width={32} height={32} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <ImageMaker src={'/images/svgs/social/instagram-white.svg'} width={32} height={32} />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <ImageMaker src={'/images/svgs/social/x-white.svg'} width={32} height={32} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <ImageMaker src={'/images/svgs/social/linkedin-white.svg'} width={32} height={32} />
                  </a>
                </li>
              </ul>
              <p className="font-14 text-white my-3">Newsletter SignUp</p>
              <Input type="email" placeholder="Enter E-mail Address" className="bg-transparent text-white" />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="py-3 bg-dark">
        <Container>
          <div className="flex-between">
            <Link href={'/contact-us'} className="text-white border-end">
              Privacy Policy
            </Link>
            <Link href={'/contact-us'} className="text-white">
              Terms & Conditions
            </Link>
          </div>
        </Container>
      </div> */}
    </footer>
  );
};

export default Footer;
