'use client';

import { useState, useEffect } from 'react';
import { CategoryFilter } from '../../components/CategoryFilter';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import type {
  Tutorial,
  CategoryFilter as CategoryFilterType,
} from '../../../types/types';

export default function TutorialsPage() {
  const [category, setCategory] = useState<CategoryFilterType>('all');
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutorials() {
      setLoading(true);
      try {
        const res = await fetch(`/api/tutorials?category=${category}`);
        const data = await res.json();
        setTutorials(data || []);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
        setTutorials([]);
      }
      setLoading(false);
    }
    fetchTutorials();
  }, [category]);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Alle tutorials</h1>
        <div className="filter-results-wrapper">
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
          <div className="results-container">
            {loading ? (
              <p className="loading-text">Laster tutorials...</p>
            ) : tutorials.length > 0 ? (
              <div className="cards-grid">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial._id} item={tutorial} type="tutorial" />
                ))}
              </div>
            ) : (
              <p className="empty-state">Ingen tutorials funnet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
