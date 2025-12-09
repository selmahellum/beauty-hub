'use client';

import { useState, useEffect } from 'react';
import { CategoryFilter } from '../../components/CategoryFilter';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import type {
  Article,
  CategoryFilter as CategoryFilterType,
} from '../../../types/types';

export default function ArticlesPage() {
  const [category, setCategory] = useState<CategoryFilterType>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles?category=${category}`);
        const data = await res.json();
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      }
      setLoading(false);
    }
    fetchArticles();
  }, [category]);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Alle artikler</h1>
        <div className="filter-results-wrapper">
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
          <div className="results-container">
            {loading ? (
              <p className="loading-text">Laster artikler...</p>
            ) : articles.length > 0 ? (
              <div className="cards-grid">
                {articles.map((article) => (
                  <Card key={article._id} item={article} type="article" />
                ))}
              </div>
            ) : (
              <p className="empty-state">Ingen artikler funnet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
