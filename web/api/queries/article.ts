import { groq } from 'next-sanity';

export const GET_ARTICLES = groq`*[_type == "article"] | order(_createdAt desc) {
  _id, 
  title, 
  slug, 
  intro, 
  image, 
  category,
  author->{name},
  _createdAt
}`;

export const GET_ARTICLES_BY_CATEGORY = groq`*[_type == "article" && ($category == "all" || category == $category)] | order(_createdAt desc) {
  _id, 
  title, 
  slug, 
  intro, 
  image, 
  category,
  author->{name},
  _createdAt
}`;

export const GET_ARTICLE_BY_SLUG = groq`*[_type == "article" && slug.current == $slug][0]{
  _id, 
  title, 
  slug, 
  intro, 
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    },
    _type == "productEmbed" => {
      ...,
      product->{
        _id,
        name,
        description,
        price,
        image,
        link,
        brand->{name}
      }
    }
  }, 
  image, 
  author->{name, profileImage}, 
  _updatedAt
}`;
