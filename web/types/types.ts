export type SanityImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export type Author = {
  name: string;
  profileImage?: SanityImage;
};

export type Article = {
  _id: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: string;
  image?: SanityImage;
  author?: Author;
  _updatedAt?: string;
};

export type Product = {
  _id: string;
  name?: string;
  description?: string;
  image?: SanityImage;
  link?: string;
  brand?: { name: string };
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
