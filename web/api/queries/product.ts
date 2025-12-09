import { groq } from 'next-sanity';

export const GET_PRODUCTS = groq`*[_type == "product"] | order(name asc) {
  _id, 
  name, 
  description,
  price,
  image, 
  category,
  link,
  brand->{name},
  _createdAt
}`;

export const GET_PRODUCTS_BY_CATEGORY = groq`*[_type == "product" && ($category == "all" || category == $category)] | order(name asc) {
  _id, 
  name, 
  description,
  price,
  image, 
  category,
  link,
  brand->{name},
  _createdAt
}`;
