import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../utils/imageUrl';
import HeartRating from '../HeartRating';
import type { RelatedContent, Tutorial, Article } from '../../../types/types';

type RelatedContentProps = {
  module: RelatedContent;
};

function isTutorial(item: Tutorial | Article): item is Tutorial {
  return item._type === 'tutorial';
}

export default function RelatedContentModule({ module }: RelatedContentProps) {
  if (!module.items || module.items.length === 0) return null;

  const isSingleItem = module.items.length === 1;
  const item = module.items[0];

  if (isSingleItem && item) {
    const image = isTutorial(item) ? item.mainImage : item.image;
    const imageUrl = image ? urlFor(image)?.width(600).height(400).url() : null;
    const slug = item.slug?.current;
    const href = slug
      ? `/${item._type === 'tutorial' ? 'tutorials' : 'articles'}/${slug}`
      : '#';

    return (
      <div className="related-content-module">
        {module.title && <h2 className="related-content-module-title">{module.title}</h2>}
        <Link href={href} className="related-content-item related-content-item--full">
          {imageUrl && (
            <div className="related-content-item-image-wrapper related-content-item-image-wrapper--side">
              <Image
                src={imageUrl}
                alt={item.title}
                width={600}
                height={400}
                className="related-content-item-image"
              />
            </div>
          )}
          <div className="related-content-item-content">
            <h3 className="related-content-item-title">{item.title}</h3>
            {isTutorial(item) && item.difficulty && (
              <div className="related-content-item-difficulty">
                <HeartRating rating={item.difficulty} size="small" />
              </div>
            )}
            {item.intro && <p className="related-content-item-intro">{item.intro}</p>}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="related-content-module">
      {module.title && <h2 className="related-content-module-title">{module.title}</h2>}
      <div className="related-content-module-grid">
        {module.items.map((item) => {
          if (!item) return null;
          const image = isTutorial(item) ? item.mainImage : item.image;
          const imageUrl = image ? urlFor(image)?.width(400).height(300).url() : null;
          const slug = item.slug?.current;
          const href = slug
            ? `/${item._type === 'tutorial' ? 'tutorials' : 'articles'}/${slug}`
            : '#';

          return (
            <Link key={item._id} href={href} className="related-content-item">
              {imageUrl && (
                <div className="related-content-item-image-wrapper">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="related-content-item-image"
                  />
                </div>
              )}
              <div className="related-content-item-content">
                <h3 className="related-content-item-title">{item.title}</h3>
                {isTutorial(item) && item.difficulty && (
                  <div className="related-content-item-difficulty">
                    <HeartRating rating={item.difficulty} size="small" />
                  </div>
                )}
                {item.intro && <p className="related-content-item-intro">{item.intro}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

