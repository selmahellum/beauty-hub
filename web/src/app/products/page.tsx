'use client';

import { useState, useEffect } from 'react';
import { ProductCategoryFilter } from '../../components/CategoryFilter';
import Tabs from '../../components/Tabs';
import ProductCard from '../../components/ProductCard';
import type {
  Product,
  ProductCategoryFilter as ProductCategoryFilterType,
} from '../../../types/types';

export default function ProductsPage() {
  const [category, setCategory] = useState<ProductCategoryFilterType>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${category}`);
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Alle produkter</h1>
        <div className="filter-results-wrapper">
          <ProductCategoryFilter
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
          <div className="results-container">
            {loading ? (
              <p className="loading-text">Laster produkter...</p>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="empty-state">Ingen produkter funnet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
