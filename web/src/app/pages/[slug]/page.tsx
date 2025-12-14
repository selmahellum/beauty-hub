import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '../../../../utils/client';
import { GET_PAGE_BY_SLUG } from '../../../../api/queries/page';
import { urlFor } from '../../../../utils/imageUrl';
import Tabs from '../../../components/Tabs';
import PageRenderer from '../../../components/PageRenderer';
import type { Page } from '../../../../types/types';

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await client.fetch<Page>(GET_PAGE_BY_SLUG, { slug });

  if (!page) {
    notFound();
  }

  const imageUrl = page.mainImage ? urlFor(page.mainImage)?.width(800).height(500).url() : null;
  const authorImageUrl = page.author?.profileImage
    ? urlFor(page.author.profileImage)?.width(60).height(60).url()
    : null;

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <article className="page-detail">
          {imageUrl && (
            <div className="page-image-wrapper">
              <Image
                src={imageUrl}
                alt={page.title}
                width={800}
                height={500}
                className="page-image"
              />
            </div>
          )}
          <h1 className="page-title">{page.title}</h1>
          {page.intro && <p className="page-intro">{page.intro}</p>}
          {page.modules && <PageRenderer modules={page.modules} />}
          <div className="page-meta">
            {page.author && (
              <div className="author-info">
                {authorImageUrl && (
                  <div className="author-image-wrapper">
                    <Image
                      src={authorImageUrl}
                      alt={page.author.name}
                      width={60}
                      height={60}
                      className="author-image"
                    />
                  </div>
                )}
                <span className="author-name">{page.author.name}</span>
              </div>
            )}
            <div className="publish-date">
              <span className="publish-label">Sist publisert:</span>
              {page._updatedAt ? (
                <span className="date-value">
                  {new Date(page._updatedAt).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  {new Date(page._updatedAt).toLocaleTimeString('nb-NO', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              ) : (
                <span className="date-value">Ikke tilgjengelig</span>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

