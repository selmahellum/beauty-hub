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
          {article.author && (
            <p className="article-author">Skrevet av {article.author.name}</p>
          )}
        </article>
      </div>
    </div>
  );
}
