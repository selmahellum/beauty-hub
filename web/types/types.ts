export type SanityImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export type Article = {
  _id: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  body?: string;
  image?: SanityImage;
  author?: { name: string };
};

export type Tutorial = {
  _id: string;
  title: string;
  slug?: { current: string };
  intro?: string;
  mainImage?: SanityImage;
  author?: { name: string };
};

export type HomePage = {
  title?: string;
  intro?: string;
  articles?: Article[];
  tutorials?: Tutorial[];
};
