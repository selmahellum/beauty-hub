import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../utils/imageUrl';
import type { Article, Tutorial } from '../../types/types';

interface CardProps {
  item: Article | Tutorial;
  type: 'article' | 'tutorial';
}

export default function Card({ item, type }: CardProps) {
  const image = type === 'article' ? (item as Article).image : (item as Tutorial).mainImage;
  const imageUrl = urlFor(image)?.width(400).height(300).url();
  const slug = item.slug?.current;
  const href = slug ? `/${type}s/${slug}` : '#';

  const cardContent = (
    <>
      <div className="card-image-wrapper">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            width={400}
            height={300}
            className="card-image"
          />
        ) : (
          <div className="card-image-placeholder">
            <span className="card-placeholder-icon">✨</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        {item.intro && <p className="card-intro">{item.intro}</p>}
      </div>
    </>
  );

  if (!slug) {
    return <div className="card">{cardContent}</div>;
  }

  return (
    <Link href={href} className="card">
      {cardContent}
    </Link>
  );
}

