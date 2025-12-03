import { groq } from 'next-sanity';

export const GET_TUTORIALS = groq`*[_type == "tutorial"]{_id, title, slug, intro, mainImage, steps[]->{title, description, image, products[]->{_id, name, brand->{name}}}, author->{name}}`;

export const GET_TUTORIAL_BY_SLUG = groq`*[_type == "tutorial" && slug.current == $slug][0]{_id, title, slug, intro, mainImage, steps[]->{title, description, image, products[]->{_id, name, brand->{name}}}, author->{name}}`;
