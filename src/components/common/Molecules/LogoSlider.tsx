'use client';
import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { CarouselMaker, ImageMaker } from '../index';

const LogoSlider = () => {
  const logos = [
    <ImageMaker src={'/images/home/logo-slider/airbnb.jpg'} width={190} height={60} key={0} />,
    <ImageMaker src={'/images/home/logo-slider/h&m.jpg'} width={190} height={60} key={1} />,
    <ImageMaker src={'/images/home/logo-slider/Pfizer.jpg'} width={190} height={60} key={2} />,
    <ImageMaker src={'/images/home/logo-slider/airbnb.jpg'} width={190} height={60} key={3} />,
    <ImageMaker src={'/images/home/logo-slider/Spotify.jpg'} width={190} height={60} key={4} />,
    <ImageMaker src={'/images/home/logo-slider/virgin.jpg'} width={190} height={60} key={5} />,
    <ImageMaker src={'/images/home/logo-slider/h&m.jpg'} width={190} height={60} key={6} />,
  ];
  return (
    <CarouselMaker
      pagination={false}
      navigation={false}
      autoplay={true}
      delay={0}
      speed={1200}
      spaceBetween={20}
      items={logos}
      numVisible={3}
    />
  );
};

export default LogoSlider;
