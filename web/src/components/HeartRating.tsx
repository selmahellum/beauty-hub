import React from 'react';
import { GoHeartFill } from 'react-icons/go';

type HeartRatingProps = {
  rating: number;
  maxHearts?: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
};

export default function HeartRating({
  rating,
  maxHearts = 5,
  size = 'medium',
  showLabel = false,
}: HeartRatingProps) {
  const sizeClasses = {
    small: 'heart-rating--small',
    medium: 'heart-rating--medium',
    large: 'heart-rating--large',
  };

  return (
    <div className={`heart-rating ${sizeClasses[size]}`}>
      <div className="heart-rating-hearts">
        {Array.from({ length: maxHearts }, (_, index) => {
          const heartValue = index + 1;
          const isFilled = heartValue <= rating;

          return (
            <span
              key={heartValue}
              className={`heart ${isFilled ? 'heart--filled' : 'heart--empty'}`}
              aria-hidden="true"
            >
              <GoHeartFill />
            </span>
          );
        })}
      </div>
      {showLabel && (
        <span className="heart-rating-label">
          Vanskelighetsgrad: {rating} av {maxHearts}
        </span>
      )}
      <span className="sr-only">
        Vanskelighetsgrad: {rating} av {maxHearts} hjerter
      </span>
    </div>
  );
}
