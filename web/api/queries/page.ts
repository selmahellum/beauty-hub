import { groq } from 'next-sanity';

export const GET_PAGE_BY_SLUG = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  intro,
  mainImage,
  _updatedAt,
  author->{
    _id,
    name,
    profileImage
  },
  modules[]{
    _type,
    _key,
    _type == "textModule" => {
      content[]{
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
            productColor->{value},
            brand->{name}
          }
        }
      }
    },
    _type == "tipBox" => {
      title,
      intro,
      image
    },
    _type == "productList" => {
      title,
      products[]->{
        _id,
        name,
        description,
        price,
        image,
        link,
        productColor,
        brand->{name},
        category
      }
    },
    _type == "relatedContent" => {
      title,
      items[]->{
        _id,
        _type,
        title,
        slug,
        intro,
        mainImage,
        image,
        category,
        difficulty,
        author->{name}
      }
    }
  }
}`;

export const GET_ALL_PAGES = groq`*[_type == "page"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  intro,
  mainImage
}`;
