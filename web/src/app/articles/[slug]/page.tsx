import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '../../../../utils/client';
import { GET_ARTICLE_BY_SLUG } from '../../../../api/queries/article';
import Tabs from '../../../components/Tabs';
import { urlFor } from '../../../../utils/imageUrl';
import type { Article } from '../../../../types/types';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client.fetch<Article>(GET_ARTICLE_BY_SLUG, { slug });

  if (!article) {
    notFound();
  }

  const imageUrl = urlFor(article.image)?.width(800).height(500).url();
  const authorImageUrl = urlFor(article.author?.profileImage)
    ?.width(60)
    .height(60)
    .url();

  return (
    <div className="container">
      <Tabs />
      <div className="article-content">
        <article className="article-detail">
          {imageUrl && (
            <div className="article-image-wrapper">
              <Image
                src={imageUrl}
                alt={article.title}
                width={800}
                height={500}
                className="article-image"
              />
            </div>
          )}
          <h1 className="article-title">{article.title}</h1>
          {article.intro && <p className="article-intro">{article.intro}</p>}
          {article.body && (
            <div className="article-body">
              {article.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
          <div className="article-meta">
            {article.author && (
              <div className="author-info">
                {authorImageUrl && (
                  <div className="author-image-wrapper">
                    <Image
                      src={authorImageUrl}
                      alt={article.author.name}
                      width={60}
                      height={60}
                      className="author-image"
                    />
                  </div>
                )}
                <span className="author-name">{article.author.name}</span>
              </div>
            )}
            <div className="publish-date">
              <span className="publish-label">Sist publisert:</span>
              {article._updatedAt ? (
                <span className="date-value">
                  {new Date(article._updatedAt).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  {new Date(article._updatedAt).toLocaleTimeString('nb-NO', {
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
