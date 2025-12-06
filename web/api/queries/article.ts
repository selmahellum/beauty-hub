import { groq } from 'next-sanity';

export const GET_ARTICLES = groq`*[_type == "article"]{_id, title, slug, intro, image, author->{name}}`;

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
