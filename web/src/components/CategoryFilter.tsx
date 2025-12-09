'use client';

import type {
  CategoryFilter as CategoryFilterType,
  ProductCategoryFilter as ProductCategoryFilterType,
} from '../../types/types';

const categories: { value: CategoryFilterType; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'makeup', label: 'Sminke' },
  { value: 'skincare', label: 'Hudpleie' },
  { value: 'other', label: 'Annet' },
];

const productCategories: { value: ProductCategoryFilterType; label: string }[] =
  [
    { value: 'all', label: 'Alle' },
    { value: 'eyes', label: 'Øyne' },
    { value: 'lips', label: 'Lepper' },
    { value: 'base', label: 'Base' },
    { value: 'skincare', label: 'Hudpleie' },
    { value: 'other', label: 'Annet' },
  ];

type CategoryFilterProps = {
  selectedCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
};

type ProductCategoryFilterProps = {
  selectedCategory: ProductCategoryFilterType;
  onCategoryChange: (category: ProductCategoryFilterType) => void;
};

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="filter-section">
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductCategoryFilter({
  selectedCategory,
  onCategoryChange,
}: ProductCategoryFilterProps) {
  return (
    <div className="filter-section">
      <div className="filter-buttons">
        {productCategories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Re-export for convenience
export {
  getCategoryLabel,
  getProductCategoryLabel,
} from '../utils/categoryUtils';
