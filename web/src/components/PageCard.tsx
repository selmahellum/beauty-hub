import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../utils/imageUrl';
import type { Page } from '../../types/types';

interface PageCardProps {
  page: Page;
}

export default function PageCard({ page }: PageCardProps) {
  const slug = page.slug?.current;
  const href = slug ? `/pages/${slug}` : '#';
  const imageUrl = page.mainImage ? urlFor(page.mainImage)?.width(400).height(300).url() : null;

  const cardContent = (
    <>
      <div className="card-image-wrapper">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={page.title}
            width={400}
            height={300}
            className="card-image"
          />
        ) : (
          <div className="card-image-placeholder">
            <span className="card-placeholder-icon">📄</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{page.title}</h3>
        {page.intro && <p className="card-intro">{page.intro}</p>}
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

