'use client';

import Image from 'next/image';
import { urlFor } from '../../utils/imageUrl';
import { HiOutlineExternalLink } from 'react-icons/hi';
import type { Product } from '../../types/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productImageUrl = product.image
    ? urlFor(product.image)?.height(300).url()
    : null;

  const Wrapper = product.link ? 'a' : 'div';
  const wrapperProps = product.link
    ? { href: product.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper className="product-list-card" {...wrapperProps}>
      <div className="product-list-content">
        {productImageUrl && (
          <div className="product-list-image-wrapper">
            <Image
              src={productImageUrl}
              alt={product.name || 'Produkt'}
              width={150}
              height={150}
              className="product-list-image"
            />
          </div>
        )}
        <div className="product-list-info">
          <div className="product-list-header">
            {product.brand?.name && (
              <span className="product-list-brand">
                {product.brand.name}
                {product.link && (
                  <HiOutlineExternalLink className="product-list-link-icon" />
                )}
              </span>
            )}
          </div>
          <div className="product-list-name-price">
            {product.name && (
              <span className="product-list-name">{product.name}</span>
            )}
            {product.price && (
              <span className="product-list-price">{product.price} kr</span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
