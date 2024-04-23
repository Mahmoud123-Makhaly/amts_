import React from 'react';
import { CardMaker } from '../../../index';
import { Link } from '@navigation';

interface IWorkCardProps {
  className?: string;
  imgSrc?: string;
  header?: string;
  description?: string;
}
const WorkCard = ({ className, description, header, imgSrc }: IWorkCardProps) => {
  return (
    <CardMaker header={header} className={`text-center border rounded work-card ${className}`} img={imgSrc}>
      <Link href={'/contact-us'} className="btn-primary w-100 py-2 d-block mt-3">
        Get Quote
      </Link>
      <p className="px-4">{description}</p>
    </CardMaker>
  );
};

export default WorkCard;
