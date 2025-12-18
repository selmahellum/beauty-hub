'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../utils/imageUrl';
import { HiOutlineExternalLink } from 'react-icons/hi';
import type {
  BlockContent,
  Product,
  LinkBlock as LinkBlockType,
  ImageBlock,
} from '../../types/types';

// Product Embed Component
function ProductBlock({ product }: { product?: Product }) {
  if (!product) return null;

  const productImageUrl = product.image
    ? urlFor(product.image)?.height(128).url()
    : null;

  const Wrapper = product.link ? 'a' : 'div';
  const wrapperProps = product.link
    ? { href: product.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper className="block-product-card" {...wrapperProps}>
      <div className="block-product-content">
        <div className="block-product-info">
          {product.brand?.name && (
            <span className="block-product-brand">
              {product.brand.name}
              {product.link && (
                <HiOutlineExternalLink className="block-product-link-icon" />
              )}
            </span>
          )}
          {product.name && (
            <span className="block-product-name">{product.name}</span>
          )}
          {product.price && (
            <span className="block-product-price">{product.price} kr</span>
          )}
          {product.description && (
            <p className="block-product-description">{product.description}</p>
          )}
          {product.productColor?.hex && (
            <div
              className="product-color-circle"
              style={{ backgroundColor: product.productColor.value }}
            />
          )}
        </div>
        {productImageUrl && (
          <div className="block-product-image-wrapper">
            <Image
              src={productImageUrl}
              alt={product.name || 'Produkt'}
              width={80}
              height={80}
              className="block-product-image"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

// Link Card Component
function LinkCardBlock({ value }: { value: LinkBlockType }) {
  if (!value.url) return null;

  const linkImageUrl = value.image
    ? urlFor(value.image)?.width(320).height(240).url()
    : null;

  return (
    <a
      href={value.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block-link-card"
    >
      {linkImageUrl && (
        <div className="block-link-image-wrapper">
          <Image
            src={linkImageUrl}
            alt={value.title || 'Link'}
            width={160}
            height={120}
            className="block-link-image"
          />
        </div>
      )}
      <div className="block-link-content">
        {value.title && <span className="block-link-title">{value.title}</span>}
        {value.description && (
          <p className="block-link-description">{value.description}</p>
        )}
        <span className="block-link-url">{new URL(value.url).hostname}</span>
      </div>
      <div className="block-link-icon-wrapper">
        <HiOutlineExternalLink className="block-link-icon" />
      </div>
    </a>
  );
}

// Image Block Component
function ImageBlockComponent({ value }: { value: ImageBlock }) {
  const imageUrl = value.asset?._ref
    ? urlFor({ _type: 'image', asset: { ...value.asset, _type: 'reference' } })
        ?.width(800)
        .url()
    : value.asset?.url || null;

  if (!imageUrl) return null;

  return (
    <figure className="block-image-figure">
      <div className="block-image-wrapper">
        <Image
          src={imageUrl}
          alt={value.alt || ''}
          width={800}
          height={500}
          className="block-image"
        />
      </div>
      {value.caption && (
        <figcaption className="block-image-caption">{value.caption}</figcaption>
      )}
    </figure>
  );
}

// Portable Text Components Configuration
const components: PortableTextComponents = {
  types: {
    image: ImageBlockComponent,
    productEmbed: ({ value }) => <ProductBlock product={value.product} />,
    link: ({ value }) => <LinkCardBlock value={value} />,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block-inline-link"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="block-heading-2">{children}</h2>,
    h3: ({ children }) => <h3 className="block-heading-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="block-quote">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="block-paragraph">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="block-list-bullet">{children}</ul>,
    number: ({ children }) => <ol className="block-list-number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="block-list-item">{children}</li>,
    number: ({ children }) => <li className="block-list-item">{children}</li>,
  },
};

// Main BlockContent Component
export default function BlockContentRenderer({
  content,
}: {
  content?: BlockContent;
}) {
  if (!content) return null;

  return (
    <div className="block-content">
      <PortableText value={content} components={components} />
    </div>
  );
}
