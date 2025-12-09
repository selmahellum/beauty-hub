import { groq } from 'next-sanity';

// Get all content (articles, tutorials, products) with optional category filter
export const GET_ALL_CONTENT = groq`{
  "articles": *[_type == "article" && ($category == "all" || category == $category)] | order(_createdAt desc) {
    _id, 
    _type,
    title, 
    slug, 
    intro, 
    image, 
    category,
    author->{name},
    _createdAt
  },
  "tutorials": *[_type == "tutorial" && ($category == "all" || category == $category)] | order(_createdAt desc) {
    _id, 
    _type,
    title, 
    slug, 
    intro, 
    mainImage, 
    category,
    author->{name},
    _createdAt
  },
  "products": *[_type == "product" && ($category == "all" || category == $category)] | order(_createdAt desc) {
    _id, 
    _type,
    name, 
    description,
    price,
    image, 
    category,
    link,
    brand->{name},
    _createdAt
  }
}`;
