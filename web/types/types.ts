import { PortableTextBlock } from '@portabletext/types';

export type SanityImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
};

export type Author = {
  name: string;
  profileImage?: SanityImage;
};

export type Category = 'makeup' | 'skincare' | 'other';
export type CategoryFilter = Category | 'all';

export type ProductCategory = 'eyes' | 'lips' | 'base' | 'skincare' | 'other';
export type ProductCategoryFilter = ProductCategory | 'all';

export type Product = {
  _id: string;
  _type?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: SanityImage;
  link?: string;
  brand?: { name: string };
  category?: ProductCategory;
  _createdAt?: string;
};

export type LinkBlock = {
  _type: 'link';
  _key: string;
  title?: string;
  description?: string;
  url?: string;
  image?: SanityImage;
};

export type ProductEmbed = {
  _type: 'productEmbed';
  _key: string;
  product?: Product;
};

export type ImageBlock = {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
};

export type BlockContent = (
  | PortableTextBlock
  | ImageBlock
  | ProductEmbed
  | LinkBlock
)[];

export type Article = {
  _id: string;
  _type?: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: BlockContent;
  image?: SanityImage;
  author?: Author;
  category?: Category;
  _updatedAt?: string;
  _createdAt?: string;
};

export type TutorialStep = {
  title?: string;
  description?: string;
  image?: SanityImage;
  products?: Product[];
};

export type Tutorial = {
  _id: string;
  _type?: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: BlockContent;
  mainImage?: SanityImage;
  author?: Author;
  category?: Category;
  difficulty?: number;
  _updatedAt?: string;
  _createdAt?: string;
  steps?: TutorialStep[];
};

export type ContentType = 'all' | 'article' | 'tutorial' | 'product';

export type AllContent = {
  articles: Article[];
  tutorials: Tutorial[];
  products: Product[];
};

export type FeaturedContent = (Article | Tutorial) & {
  _type: 'article' | 'tutorial';
};

export type HomePage = {
  title?: string;
  intro?: string;
  featuredContent?: FeaturedContent[];
};
