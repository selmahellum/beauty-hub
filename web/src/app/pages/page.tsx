'use client';

import { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import PageCard from '../../components/PageCard';
import type { Page } from '../../../types/types';

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPages() {
      setLoading(true);
      try {
        const res = await fetch('/api/pages');
        const data = await res.json();
        setPages(data || []);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setPages([]);
      }
      setLoading(false);
    }
    fetchPages();
  }, []);

  return (
    <div className="container">
      <Tabs />
      <div className="page-content">
        <h1 className="page-title">Temasider</h1>
        <div className="results-container">
          {loading ? (
            <p className="loading-text">Laster temasider...</p>
          ) : pages.length > 0 ? (
            <div className="cards-grid">
              {pages.map((page) => (
                <PageCard key={page._id} page={page} />
              ))}
            </div>
          ) : (
            <p className="empty-state">Ingen temasider funnet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

