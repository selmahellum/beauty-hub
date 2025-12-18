import Image from 'next/image';
import { urlFor } from '../../../utils/imageUrl';
import type { ProductList } from '../../../types/types';
import { HiOutlineExternalLink } from 'react-icons/hi';

type ProductListProps = {
  module: ProductList;
};

export default function ProductListModule({ module }: ProductListProps) {
  if (!module.products || module.products.length === 0) return null;

  return (
    <div className="product-list-module">
      <div className="product-list-module-container">
        {module.title && (
          <h3 className="product-list-module-title-inline">{module.title}</h3>
        )}
        <div className="product-list-module-list">
          {module.products.map((product) => {
            if (!product) return null;
            console.log(product.productColor?.value);
            const productImageUrl = product.image
              ? urlFor(product.image)?.height(80).fit('max').url()
              : null;
            const ProductWrapper = product.link ? 'a' : 'div';
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
                      <span className="product-name">{product.name}</span>
                    )}
                    {product.price && (
                      <span className="product-card-price">
                        {product.price} NOK
                      </span>
                    )}
                    {product.productColor?.value && (
                      <div
                        className="product-color-circle"
                        style={{ backgroundColor: product.productColor.value }}
                      />
                    )}
                  </div>
                  {productImageUrl && (
                    <div className="product-card-image-wrapper product-card-image-wrapper--large">
                      <Image
                        src={productImageUrl}
                        alt={product.name || 'Produkt'}
                        width={0}
                        height={80}
                        className="product-card-image"
                        style={{ width: 'auto', height: '80px' }}
                      />
                    </div>
                  )}
                </div>
              </ProductWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
