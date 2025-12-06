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

export type Product = {
  _id: string;
  name?: string;
  description?: string;
  image?: SanityImage;
  link?: string;
  brand?: { name: string };
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
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: BlockContent;
  image?: SanityImage;
  author?: Author;
  _updatedAt?: string;
};

export type TutorialStep = {
  title?: string;
  description?: string;
  image?: SanityImage;
  products?: Product[];
};

export type Tutorial = {
  _id: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: BlockContent;
  mainImage?: SanityImage;
  author?: Author;
  _updatedAt?: string;
  steps?: TutorialStep[];
};

export type HomePage = {
  title?: string;
  intro?: string;
  articles?: Article[];
  tutorials?: Tutorial[];
};
