import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '../../../../utils/client';
import { GET_TUTORIAL_BY_SLUG } from '../../../../api/queries/tutorial';
import Tabs from '../../../components/Tabs';
import { urlFor } from '../../../../utils/imageUrl';
import type { Tutorial } from '../../../../types/types';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = await client.fetch<Tutorial>(GET_TUTORIAL_BY_SLUG, { slug });

  if (!tutorial) {
    notFound();
  }

  const imageUrl = urlFor(tutorial.mainImage)?.width(800).height(500).url();
  const authorImageUrl = urlFor(tutorial.author?.profileImage)
    ?.width(60)
    .height(60)
    .url();

  return (
    <div className="container">
      <Tabs />
      <div className="tutorial-content">
        <article className="tutorial-detail">
          {imageUrl && (
            <div className="tutorial-image-wrapper">
              <Image
                src={imageUrl}
                alt={tutorial.title}
                width={800}
                height={500}
                className="tutorial-image"
                loading="eager"
                priority
              />
            </div>
          )}
          <h1 className="tutorial-title">{tutorial.title}</h1>
          {tutorial.intro && <p className="tutorial-intro">{tutorial.intro}</p>}

          {tutorial.steps && tutorial.steps.length > 0 ? (
            <div className="tutorial-steps">
              <h2 className="tutorial-steps-title">Slik gjør du:</h2>
              {tutorial.steps
                .filter((step) => step !== null && step !== undefined)
                .map((step, index) => {
                  const stepImageUrl = step?.image
                    ? urlFor(step.image)?.width(400).height(300).url()
                    : null;
                  return (
                    <div key={index} className="tutorial-step">
                      <div className="tutorial-step-number">{index + 1}</div>
                      <div className="tutorial-step-content">
                        <div className="tutorial-step-main">
                          {step?.title && (
                            <h3 className="tutorial-step-title">
                              {step.title}
                            </h3>
                          )}
                          {step?.description && (
                            <p className="tutorial-step-description">
                              {step.description}
                            </p>
                          )}
                          {step?.products && step.products.length > 0 && (
                            <div className="tutorial-step-products">
                              <span className="tutorial-step-products-label">
                                Produkter:
                              </span>
                              <div className="tutorial-step-products-list">
                                {step.products
                                  .filter(
                                    (product) =>
                                      product !== null && product !== undefined
                                  )
                                  .map((product) => {
                                    const productImageUrl = product.image
                                      ? urlFor(product.image)?.height(128).url()
                                      : null;
                                    const ProductWrapper = product.link
                                      ? 'a'
                                      : 'div';
                                    const wrapperProps = product.link
                                      ? {
                                          href: product.link,
                                          target: '_blank',
                                          rel: 'noopener noreferrer',
                                        }
                                      : {};
                                    return (
                                      <ProductWrapper
                                        key={product._id}
                                        className="product-card"
                                        {...wrapperProps}
                                      >
                                        <div className="product-card-content">
                                          <div className="product-card-info">
                                            {product.brand?.name && (
                                              <span className="product-brand">
                                                {product.brand.name}
                                                {product.link && (
                                                  <HiOutlineExternalLink className="product-link-icon" />
                                                )}
                                              </span>
                                            )}
                                            {product.name && (
                                              <span className="product-name">
                                                {product.name}
                                              </span>
                                            )}
                                          </div>
                                          {productImageUrl && (
                                            <div className="product-card-image-wrapper">
                                              <Image
                                                src={productImageUrl}
                                                alt={product.name || 'Produkt'}
                                                width={56}
                                                height={56}
                                                className="product-card-image"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </ProductWrapper>
                                    );
                                  })}
                              </div>
                            </div>
                          )}
                        </div>
                        {stepImageUrl && (
                          <div className="tutorial-step-image-wrapper">
                            <Image
                              src={stepImageUrl}
                              alt={step?.title || `Steg ${index + 1}`}
                              width={400}
                              height={300}
                              className="tutorial-step-image"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="tutorial-steps">
              <p>Ingen steg tilgjengelig</p>
            </div>
          )}

          <div className="tutorial-meta">
            {tutorial.author && (
              <div className="author-info">
                {authorImageUrl && (
                  <div className="author-image-wrapper">
                    <Image
                      src={authorImageUrl}
                      alt={tutorial.author.name}
                      width={60}
                      height={60}
                      className="author-image"
                    />
                  </div>
                )}
                <span className="author-name">{tutorial.author.name}</span>
              </div>
            )}
            <div className="publish-date">
              <span className="publish-label">Sist publisert:</span>
              {tutorial._updatedAt ? (
                <span className="date-value">
                  {new Date(tutorial._updatedAt).toLocaleDateString('nb-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  {new Date(tutorial._updatedAt).toLocaleTimeString('nb-NO', {
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
