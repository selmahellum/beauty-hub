import { groq } from 'next-sanity';

export const GET_TUTORIALS = groq`*[_type == "tutorial"] | order(_createdAt desc) {
  _id, 
  title, "Playfair Display", "Playfair Display Fallback"
  slug, 
  intro, 
  mainImage, 
  category,
  author->{name},
  _createdAt
}`;

export const GET_TUTORIALS_BY_CATEGORY = groq`*[_type == "tutorial" && ($category == "all" || category == $category)] | order(_createdAt desc) {
  _id, 
  title, 
  slug, 
  intro, 
  mainImage, 
  category,
  author->{name},
  _createdAt
}`;

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
        price,
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
    products[]->{_id, name, description, price, image, link, brand->{name}}
  }, 
  author->{name, profileImage}, 
  _updatedAt
}`;
