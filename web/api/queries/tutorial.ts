import { groq } from 'next-sanity';

export const GET_TUTORIALS = groq`*[_type == "tutorial"]{_id, title, slug, intro, mainImage, author->{name}}`;

export const GET_TUTORIAL_BY_SLUG = groq`*[_type == "tutorial" && slug.current == $slug][0]{
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
        image,
        link,
        brand->{name}
      }
    }
  },
  mainImage, 
  steps[]{
    title, 
    description, 
    image, 
    products[]->{_id, name, description, image, link, brand->{name}}
  }, 
  author->{name, profileImage}, 
  _updatedAt
}`;
