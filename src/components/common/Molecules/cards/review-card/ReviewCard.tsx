import React from 'react';
import { CardMaker, ImageMaker, Rate } from '@components';

interface IReviewCardProps {
  name: string;
  rating: number;
  stars?: number;
  imgSrc?: string;
  review?: string;
  date?: string;
  className?: string;
}
const ReviewCard = (props: IReviewCardProps) => {
  const { name, date, imgSrc, rating, review, stars = 5, className } = props;
  return (
    <CardMaker className={`review-card ${className}`}>
      {imgSrc && <ImageMaker src={imgSrc} priority />}
      <Rate value={rating} stars={stars} />
      <p className="font-14">{review}</p>
      <p className="fw-semibold">{name}</p>
      <p className="font-14 text-dark-gray">{date}</p>
    </CardMaker>
  );
};

export default ReviewCard;
