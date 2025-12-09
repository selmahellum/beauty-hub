import type { Category, ProductCategory } from '../../types/types';

export function getCategoryLabel(category?: Category | string): string {
  switch (category) {
    case 'makeup':
      return 'Sminke';
    case 'skincare':
      return 'Hudpleie';
    case 'other':
      return 'Annet';
    default:
      return '';
  }
}

export function getProductCategoryLabel(category?: ProductCategory | string): string {
  switch (category) {
    case 'eyes':
      return 'Øyne';
    case 'lips':
      return 'Lepper';
    case 'base':
      return 'Base';
    case 'skincare':
      return 'Hudpleie';
    case 'other':
      return 'Annet';
    default:
      return '';
  }
}
